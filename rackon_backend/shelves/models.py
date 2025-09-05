from django.db import models
from users.models import User

class Shelf(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shelves')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    size = models.CharField(max_length=50)  # e.g., "Small", "Medium", "Large"
    visibility = models.CharField(max_length=50)  # e.g., "High", "Medium", "Low"
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
