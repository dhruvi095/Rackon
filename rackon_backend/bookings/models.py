from django.db import models
from django.utils.timezone import now
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.exceptions import ValidationError

from users.models import User
from shelves.models import Shelf
from products.models import Product
from notifications.models import Notification

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
    )

    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='bookings')
    brand = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.brand.username} -> {self.shelf.name} ({self.status})"

    @property
    def is_active(self):
        """Check if the booking is currently active."""
        today = now().date()
        return self.status == 'accepted' and self.start_date <= today <= self.end_date

    def clean(self):
        """Prevent overlapping accepted bookings for the same shelf."""
        overlapping = Booking.objects.filter(
            shelf=self.shelf,
            status='accepted',
            start_date__lte=self.end_date,
            end_date__gte=self.start_date
        ).exclude(pk=self.pk)
        if overlapping.exists():
            raise ValidationError("This shelf is already booked for the selected dates.")

