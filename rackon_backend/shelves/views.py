from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ShelfFilter
from .permissions import IsShelfOwnerOrReadOnly
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from users.permissions import IsOwner
from rest_framework.decorators import api_view, permission_classes
from bookings.models import Booking


class ShelfDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelf.objects.all()
    serializer_class = ShelfSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]   # Anyone can view shelf details
        return [IsAuthenticated(), IsOwner(),IsShelfOwnerOrReadOnly()]   # Only owners can update/delete

    def perform_update(self, serializer):
        # Prevent changing the owner accidentally
        serializer.save(owner=self.request.user)


class ShelfImageUploadView(generics.CreateAPIView):
    serializer_class = ShelfImageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    parser_classes = [MultiPartParser, FormParser]  # needed for file uploads

    def post(self, request, *args, **kwargs):
        shelf_id = request.data.get('shelf')
        
        if not shelf_id:
            return Response({"detail": "Shelf ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        shelf = get_object_or_404(Shelf, id=shelf_id)

        # ✅ Ensure only the owner can upload images
        if shelf.owner != request.user:
            return Response(
                {"detail": "Not authorized to upload images to this shelf."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Support multiple images at once
        images = request.FILES.getlist('images')
        if not images:
            return Response(
                {"detail": "No images provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_images = []
        for image in images:
            serializer = self.get_serializer(data={'image': image})
            serializer.is_valid(raise_exception=True)
            serializer.save(shelf=shelf)
            created_images.append(serializer.data)
        print(f"[DEBUG] request.user: {request.user}, shelf.owner: {shelf.owner}")

        return Response(created_images, status=status.HTTP_201_CREATED)


class ShelfImageDeleteView(generics.DestroyAPIView):
    queryset = ShelfImage.objects.all()
    serializer_class = ShelfImageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def delete(self, request, *args, **kwargs):
        image = self.get_object()

        # Ensure only the owner of the shelf can delete the image
        if image.shelf.owner != request.user:
            return Response({"detail": "Not authorized to delete this image."},
                            status=status.HTTP_403_FORBIDDEN)

        image.delete()
        return Response({"detail": "Image deleted successfully."},
                        status=status.HTTP_204_NO_CONTENT)
        
    
class ShelfListCreateView(generics.ListCreateAPIView):
    queryset = Shelf.objects.all()
    serializer_class = ShelfSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShelfFilter

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]   # Anyone can view the list of shelves
        return [IsAuthenticated(), IsOwner()]   # Only logged-in users can create shelves

    def get_queryset(self):
        qs = Shelf.objects.select_related("owner").prefetch_related("images")

        if not self.request.user.is_authenticated:
            # Public user: show only publicly available shelves
            qs = qs.filter(currently_available=True)
        else:
            # Authenticated owner: show only their own shelves
            qs = qs.filter(owner=self.request.user)

        return qs.order_by('-currently_available', '-created_at')


    def get_serializer_context(self):
        # Ensure request is available in serializer
        return {"request": self.request}
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# shelves/views.py
class ShelfInventoryListCreateView(generics.ListCreateAPIView):
    serializer_class = ShelfInventorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        shelf_id = self.kwargs.get('shelf_id')
        
        if not shelf_id:
            return ShelfInventory.objects.none()  # Return empty if no shelf_id

        user = self.request.user
        # Check if user is owner of the shelf
        try:
            shelf = Shelf.objects.get(id=shelf_id)
        except Shelf.DoesNotExist:
            return ShelfInventory.objects.none()

        if shelf.owner == user:  # Owner sees all inventory on their shelf
            return ShelfInventory.objects.filter(shelf_id=shelf_id)
        else:  # Brands see only their own products
            return ShelfInventory.objects.filter(shelf_id=shelf_id, brand=user)

    def perform_create(self, serializer):
        # Ensure brand and shelf are assigned
        shelf_id = self.request.data.get('shelf')
        shelf = Shelf.objects.get(id=shelf_id)
        serializer.save(brand=self.request.user, shelf=shelf)

class ShelfInventoryUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ShelfInventorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ShelfInventory.objects.filter(brand=self.request.user)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shelf(request):
    serializer = ShelfSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_shelf(request, shelf_id):
    try:
        shelf = Shelf.objects.get(id=shelf_id, owner=request.user)
    except Shelf.DoesNotExist:
        return Response({"error": "Shelf not found"}, status=404)
    
    serializer = ShelfSerializer(shelf, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)




class AvailableShelvesView(generics.ListAPIView):
    serializer_class = ShelfSerializer
    permission_classes = [AllowAny]  # or [IsAuthenticated] if you want only logged-in users

    def get_queryset(self):
        # ✅ Return shelves that are marked as available and active
        return Shelf.objects.filter(
            currently_available=True,
            is_active=True
        ).select_related("owner").prefetch_related("images")


class BrandActiveShelves(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        bookings = Booking.objects.filter(
            brand=user,
            status="accepted"
        ).values_list("shelf_id", flat=True)

        if not bookings:
            return Response([])  # Return empty list early

        shelves = Shelf.objects.filter(
            id__in=bookings,
            is_active=True,
        ).distinct()

        serializer = ShelfSerializer(shelves, many=True)
        return Response(serializer.data)
