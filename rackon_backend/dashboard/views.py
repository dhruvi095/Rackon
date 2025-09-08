from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from shelves.models import Shelf
from bookings.models import Booking
from django.db.models import Sum, Count
import datetime

<<<<<<< HEAD

class OwnerDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
=======
# 👇 import the custom role-based permissions
from users.permissions import IsOwner, IsBrand  


class OwnerDashboardView(APIView):
    # ⬅️ Only allow authenticated + owners
    permission_classes = [permissions.IsAuthenticated, IsOwner]
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

    def get(self, request):
        user = request.user
        shelves = Shelf.objects.filter(owner=user)
        total_shelves = shelves.count()
<<<<<<< HEAD
        total_revenue = Booking.objects.filter(shelf__owner=user, status='accepted').aggregate(Sum('shelf__rent'))['shelf__rent__sum'] or 0
=======
        total_revenue = Booking.objects.filter(
            shelf__owner=user, status='accepted'
        ).aggregate(Sum('shelf__rent'))['shelf__rent__sum'] or 0
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        bookings_count = Booking.objects.filter(shelf__owner=user).values('status').annotate(count=Count('id'))
        recent_bookings = Booking.objects.filter(shelf__owner=user).order_by('-created_at')[:5]

        return Response({
            "total_shelves": total_shelves,
            "total_revenue": total_revenue,
            "bookings_count": list(bookings_count),
            "recent_bookings": [{
                "shelf": b.shelf.name,
                "brand": b.brand.username,
                "status": b.status,
                "start_date": b.start_date,
                "end_date": b.end_date
            } for b in recent_bookings]
        })

<<<<<<< HEAD
class BrandDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
=======

class BrandDashboardView(APIView):
    # ⬅️ Only allow authenticated + brands
    permission_classes = [permissions.IsAuthenticated, IsBrand]
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

    def get(self, request):
        user = request.user
        bookings = Booking.objects.filter(brand=user)
        total_shelves_booked = bookings.values('shelf').distinct().count()
<<<<<<< HEAD
        total_amount_spent = bookings.filter(status='accepted').aggregate(Sum('shelf__rent'))['shelf__rent__sum'] or 0
=======
        total_amount_spent = bookings.filter(
            status='accepted'
        ).aggregate(Sum('shelf__rent'))['shelf__rent__sum'] or 0
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        active_bookings = bookings.filter(status='accepted', end_date__gte=datetime.date.today())
        recent_bookings = bookings.order_by('-created_at')[:5]

        return Response({
            "total_shelves_booked": total_shelves_booked,
            "total_amount_spent": total_amount_spent,
            "active_bookings": active_bookings.count(),
            "recent_bookings": [{
                "shelf": b.shelf.name,
                "status": b.status,
                "start_date": b.start_date,
                "end_date": b.end_date
            } for b in recent_bookings]
        })
