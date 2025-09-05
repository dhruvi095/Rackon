from rest_framework import generics, permissions
from .models import *
from rest_framework.exceptions import PermissionDenied
from .serializers import *
from .permissions import *
from django.utils.timezone import now
from django.db.models import Q, Prefetch
from shelves.models import Shelf


class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        # auto-expire old booking 
        
        today = now().date()
        Booking.objects.filter(
            end_date__lt=today,
            status__in=['pending', 'accepted']
        ).update(status='expired')
        
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
        shelf = serializer.validated_data['shelf']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

        # Prevent overlapping pending or accepted bookings
        if Booking.objects.filter(
            shelf=shelf,
            status__in=['pending', 'accepted'],  # ✅ blocks both
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
        # Auto-expire this booking if outdated
        obj = super().get_object()
        if obj.end_date < now().date() and obj.status in ['pending', 'accepted']:
            obj.status = 'expired'
            obj.save(update_fields=['status'])
        return obj

class BookingStatusUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, IsRetailerShelfOwner]

    def perform_update(self, serializer):
        serializer.save()
