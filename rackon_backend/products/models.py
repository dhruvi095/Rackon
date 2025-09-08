# products/models.py
from django.db import models
from django.contrib.auth import get_user_model
# from shelves.models import Shelf
# from bookings.models import Booking

User = get_user_model()

class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    shelf = models.ForeignKey("shelves.Shelf", on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    booking = models.ForeignKey("bookings.Booking", on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.brand.username})"
