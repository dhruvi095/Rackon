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
            # Only truly available shelves for public
            qs = qs.filter(currently_available=True)
        return qs.order_by('-currently_available', '-created_at')

    def get_serializer_context(self):
        # Ensure request is available in serializer
        return {"request": self.request}
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
