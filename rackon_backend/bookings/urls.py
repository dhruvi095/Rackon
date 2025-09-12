from django.urls import path
from .views import *

urlpatterns = [
    path('', BookingListCreateView.as_view(), name='booking-list-create'),
    path('<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),
    path('<int:pk>/status/', BookingStatusUpdateView.as_view(), name='booking-status-update'),
    path('my/', MyBookingsView.as_view(), name='my-bookings'),
]
