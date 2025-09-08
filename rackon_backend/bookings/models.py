from django.db import models
from django.utils.timezone import now
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from users.models import User
from shelves.models import Shelf
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

    def __str__(self):
        return f"{self.brand.username} -> {self.shelf.name} ({self.status})"



