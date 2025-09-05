from django.urls import path
from .views import CreateBookingPaymentView, PaymentListView, payment_webhook

urlpatterns = [
    path('booking/<int:booking_id>/pay/', CreateBookingPaymentView.as_view(), name='create_booking_payment'),
    path('my-payments/', PaymentListView.as_view(), name='payment_list'),
    path('webhook/', payment_webhook, name='payment_webhook'),
]
