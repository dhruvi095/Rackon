from rest_framework import generics, permissions
from .models import Booking
from rest_framework.exceptions import PermissionDenied
from .serializers import *
from .permissions import IsBookingOwnerOrReadOnly, IsRetailerShelfOwner
from django.utils.timezone import now
from django.db.models import Prefetch
from shelves.models import Shelf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# 👇 Import role-based permissions
from users.permissions import IsOwner, IsBrand


class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return BookingCreateSerializer  
        return BookingSerializer

    def get_queryset(self):
        today = now().date()
        Booking.objects.filter(
            end_date__lt=today,
            status__in=['pending', 'accepted']
        ).update(status='expired')

        user = self.request.user
        if user.role == "owner":
            qs = Booking.objects.filter(shelf__owner=user)
        else:  # brand
            qs = Booking.objects.filter(brand=user)

        return qs.select_related('shelf', 'brand').prefetch_related(
            Prefetch('shelf__images')
        ).order_by('-created_at')

    def perform_create(self, serializer):
        if self.request.user.role != "brand":
            raise PermissionDenied("Only brands can make bookings.")

        shelf = serializer.validated_data.get('shelf')
        start_date = serializer.validated_data.get('start_date')
        end_date = serializer.validated_data.get('end_date')

        if not (shelf and start_date and end_date):
            raise PermissionDenied("shelf, start_date, and end_date are required.")

        if Booking.objects.filter(
            shelf=shelf,
            status__in=['pending', 'accepted'],
            start_date__lte=end_date,
            end_date__gte=start_date
        ).exists():
            raise PermissionDenied("This shelf is already booked or awaiting confirmation for the selected dates.")

        serializer.save(brand=self.request.user)


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, IsBookingOwnerOrReadOnly]

    def get_object(self):
        obj = super().get_object()
        if obj.end_date < now().date() and obj.status in ['pending', 'accepted']:
            obj.status = 'expired'
            obj.save(update_fields=['status'])
        return obj


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingStatusSerializer, BookingSerializer
from .permissions import IsRetailerShelfOwner


class BookingStatusUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, IsRetailerShelfOwner]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validate and save status change
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # ✅ Return full booking object after update
        return Response(
            BookingSerializer(instance, context={'request': request}).data,
            status=status.HTTP_200_OK
        )


class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Booking.objects.filter(brand=user).select_related('shelf', 'brand','payment')
