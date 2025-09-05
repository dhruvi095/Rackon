from rest_framework import generics, permissions
from .models import Booking
from rest_framework.exceptions import PermissionDenied
from .serializers import BookingSerializer, BookingStatusSerializer
from .permissions import IsBookingOwnerOrReadOnly, IsRetailerShelfOwner
from django.utils.timezone import now
from django.db.models import Prefetch
from shelves.models import Shelf

# 👇 Import role-based permissions
from users.permissions import IsOwner, IsBrand


class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

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
        # ✅ Only brands can create bookings
        if self.request.user.role != "brand":
            raise PermissionDenied("Only brands can make bookings.")

        shelf = serializer.validated_data['shelf']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

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


class BookingStatusUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner, IsRetailerShelfOwner]
    # ✅ Only owners can update booking status

    def perform_update(self, serializer):
        serializer.save()
