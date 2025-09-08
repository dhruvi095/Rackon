from xmlrpc import client
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Payment
from bookings.models import Booking
from .serializers import PaymentSerializer
from django.conf import settings
import razorpay
import hmac
import hashlib
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt




# Create payment for a booking
class CreateBookingPaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"detail": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        if booking.brand != request.user:
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        if hasattr(booking, 'payment'):
            return Response({"detail": "Payment already exists for this booking"}, status=status.HTTP_400_BAD_REQUEST)

        amount_in_paise = int(booking.shelf.rent * 100)

        payment = Payment.objects.create(
            booking=booking,
            user=request.user,
            amount=booking.shelf.rent,  # store in rupees
            payment_type='booking_fee',
            status='pending'
        )


        # Initialize Razorpay client
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

        # Create Razorpay order
        razorpay_order = client.order.create({
            "amount": amount_in_paise,
            "currency": "INR",
            "payment_capture": 1,  # auto-capture
            "notes": {
                "payment_id": str(payment.id),
                "booking_id": str(booking.id)
            }
        })

        # Save Razorpay order ID to Payment
        payment.payment_gateway_id = razorpay_order['id']
        payment.save(update_fields=['payment_gateway_id'])

        return Response({
            "payment_id": payment.id,
            "booking_id": booking.id,
            "amount": payment.amount,
            "razorpay_order_id": razorpay_order['id'],
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "currency": "INR"
        }, status=status.HTTP_201_CREATED)

# List all payments of the logged-in user
class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)




@csrf_exempt
@api_view(['POST'])
def payment_webhook(request):
    webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET
    body = request.body
    received_signature = request.META.get('HTTP_X_RAZORPAY_SIGNATURE')

    try:
        client.utility.verify_webhook_signature(body, received_signature, webhook_secret)
    except razorpay.errors.SignatureVerificationError:
        return Response({"detail": "Invalid signature"}, status=400)

    payload = request.data
    event = payload.get('event')

    if event in ["payment.captured", "payment.failed"]:
        razorpay_order_id = payload['payload']['payment']['entity']['order_id']
        status_gateway = 'completed' if event == "payment.captured" else 'failed'

        try:
            payment = Payment.objects.get(payment_gateway_id=razorpay_order_id)
        except Payment.DoesNotExist:
            return Response({"detail": "Payment not found"}, status=404)

        payment.status = status_gateway
        payment.save(update_fields=['status'])

        if payment.booking:
            if payment.status == 'completed':
                payment.booking.status = 'accepted'
            elif payment.status == 'failed':
                payment.booking.status = 'pending'  # or 'rejected'
            payment.booking.save(update_fields=['status'])


    return Response({"detail": "Webhook processed"})
