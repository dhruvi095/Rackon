<<<<<<< HEAD
from django.db import models

# Create your models here.
=======
# payment/models.py
from django.db import models
from django.conf import settings
from bookings.models import Booking

class Payment(models.Model):
    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )

    PAYMENT_TYPE = (
        ('booking_fee', 'Booking Fee'),
        ('premium_listing', 'Premium Listing'),
        ('analytics_subscription', 'Analytics Subscription'),
        ('sales_commission', 'Sales Commission'),
    )

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment', null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=50, choices=PAYMENT_TYPE, default='booking_fee')
    payment_gateway_id = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.booking} - {self.payment_type} - {self.status}"
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
