from django.db import models
from users.models import User
from products.models import Product

class Shelf(models.Model):
    EVENT_TYPES = [
        ('Retail / Pop-up store', 'Retail / Pop-up store'),
        ('Art Exhibit / Gallery', 'Art Exhibit / Gallery'),
        ('Corporate Event', 'Corporate Event'),
        ("Workshop / Seminar", "Workshop / Seminar"),
        ("Food / Beverage Tasting", "Food / Beverage Tasting"),
        ("Book / Art Launch", "Book / Art Launch"),
        ("Other", "Other"),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shelves')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    size = models.CharField(max_length=50)  # e.g., "Small", "Medium", "Large"
    visibility = models.CharField(max_length=50)  # e.g., "High", "Medium", "Low"
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='Retail / Pop-up store')
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='shelf_images/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    currently_available = models.BooleanField(default=True)   


    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.location})"

class ShelfImage(models.Model):
    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='shelf_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.shelf.name}"


class ShelfInventory(models.Model):
    shelf = models.ForeignKey('Shelf', on_delete=models.CASCADE, related_name='inventory')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    brand = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shelf_inventory')
    quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('shelf', 'product', 'brand')

    def __str__(self):
        return f"{self.product.name} on {self.shelf.name} ({self.quantity})"
