from rest_framework import generics, permissions
<<<<<<< HEAD
from .models import *
from rest_framework.exceptions import PermissionDenied
from .serializers import *
from .permissions import *
from django.utils.timezone import now
from django.db.models import Q, Prefetch
from shelves.models import Shelf

=======
from .models import Booking
from rest_framework.exceptions import PermissionDenied
from .serializers import BookingSerializer, BookingStatusSerializer
from .permissions import IsBookingOwnerOrReadOnly, IsRetailerShelfOwner
from django.utils.timezone import now
from django.db.models import Prefetch
from shelves.models import Shelf

# 👇 Import role-based permissions
from users.permissions import IsOwner, IsBrand

>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
<<<<<<< HEAD
        
        # auto-expire old booking 
        
=======
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        today = now().date()
        Booking.objects.filter(
            end_date__lt=today,
            status__in=['pending', 'accepted']
        ).update(status='expired')
<<<<<<< HEAD
        
        user = self.request.user
        if getattr(user, "is_retailer", False):
            # Retailers see bookings for their shelves
            qs = Booking.objects.filter(shelf__owner=user)
        else:
            # Brands see their own bookings
            qs = Booking.objects.filter(brand=user)
            
        qs = qs.select_related('shelf', 'brand').prefetch_related(
            Prefetch('shelf__images')
        ).order_by('-created_at')
        return qs
            
            
    def perform_create(self, serializer):
=======

        user = self.request.user
        if user.role == "owner":
            qs = Booking.objects.filter(shelf__owner=user)
        else:  # brand
            qs = Booking.objects.filter(brand=user)

        return qs.select_related('shelf', 'brand').prefetch_related(
            Prefetch('shelf__images')
        ).order_by('-created_at')

    def perform_create(self, serializer):
        # ✅ Only brands can create bookings
        if self.request.user.role != "brand":
            raise PermissionDenied("Only brands can make bookings.")

>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        shelf = serializer.validated_data['shelf']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

<<<<<<< HEAD
        # Prevent overlapping pending or accepted bookings
        if Booking.objects.filter(
            shelf=shelf,
            status__in=['pending', 'accepted'],  # ✅ blocks both
=======
        if Booking.objects.filter(
            shelf=shelf,
            status__in=['pending', 'accepted'],
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
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
<<<<<<< HEAD
        # Auto-expire this booking if outdated
=======
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        obj = super().get_object()
        if obj.end_date < now().date() and obj.status in ['pending', 'accepted']:
            obj.status = 'expired'
            obj.save(update_fields=['status'])
        return obj

<<<<<<< HEAD
class BookingStatusUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, IsRetailerShelfOwner]
=======

class BookingStatusUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner, IsRetailerShelfOwner]
    # ✅ Only owners can update booking status
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

    def perform_update(self, serializer):
        serializer.save()
