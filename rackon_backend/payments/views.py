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
from rest_framework.views import APIView
import razorpay


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

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

        # If payment exists → reuse Razorpay order
        if hasattr(booking, 'payment'):
            payment = booking.payment
            if payment.status == 'completed':
                return Response({"detail": "Payment already completed"}, status=status.HTTP_400_BAD_REQUEST)

            amount_in_paise = int(payment.amount * 100)  # 💾 amount is stored in rupees → convert once
            return Response({
                "payment_id": payment.id,
                "booking_id": booking.id,
                "amount": amount_in_paise,   # ✅ fixed: always return paise
                "display_amount": payment.amount,  # ✅ rupees for frontend display
                "razorpay_order_id": payment.payment_gateway_id,
                "razorpay_key": settings.RAZORPAY_KEY_ID,
                "currency": "INR",
                "status": payment.status
            }, status=status.HTTP_200_OK)

        # Create new payment if none exists
        amount_in_paise = int(booking.shelf.rent * 100)

        payment = Payment.objects.create(
            booking=booking,
            user=request.user,
            amount=booking.shelf.rent,  # store in rupees
            payment_type='booking_fee',
            status='pending'
        )

        razorpay_order = client.order.create({
            "amount": amount_in_paise,  # paise
            "currency": "INR",
            "payment_capture": 1,
            "notes": {"payment_id": str(payment.id), "booking_id": str(booking.id)}
        })

        payment.payment_gateway_id = razorpay_order['id']
        payment.save(update_fields=['payment_gateway_id'])

        return Response({
            "payment_id": payment.id,
            "booking_id": booking.id,
            "amount": amount_in_paise,        # ✅ send paise to Razorpay
            "display_amount": payment.amount, # ✅ rupees for UI
            "razorpay_order_id": razorpay_order['id'],
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "currency": "INR",
            "status": payment.status
        }, status=status.HTTP_201_CREATED)


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



class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)




class VerifyPaymentView(APIView):
    def post(self, request):
        data = request.data
        print("🔎 Verify payload from frontend:", data)
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_signature = request.data.get("razorpay_signature")
        booking_id = request.data.get("booking_id")

        if not all([razorpay_payment_id, razorpay_order_id, razorpay_signature]):
            return Response({"detail": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })
        except Exception:
            return Response({"detail": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

        # if booking_id not sent → fetch from Payment.notes
        if not booking_id:
            try:
                payment = Payment.objects.get(payment_gateway_id=razorpay_order_id)
                booking_id = payment.booking.id
            except Payment.DoesNotExist:
                return Response({"detail": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

        booking = Booking.objects.get(id=booking_id)

        # ✅ update both status and payment_status
        booking.payment_status = "completed"
        booking.status = "accepted"   # <-- add this
        booking.save()

        Payment.objects.filter(payment_gateway_id=razorpay_order_id).update(
            status="completed",
            razorpay_payment_id=razorpay_payment_id
        )

        return Response({"detail": "Payment verified and booking updated"}, status=status.HTTP_200_OK)
