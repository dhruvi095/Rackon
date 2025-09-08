from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from datetime import timedelta
import random

class User(AbstractUser):
    ROLE_CHOICES = (
        ('owner', 'Shelf Owner'),
        ('brand', 'Brand'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    profile_image = models.ImageField(upload_to='images/', null=True, blank=True, default='defaults/default_avatar.png')

    def save(self, *args, **kwargs):
        # Ensure default avatar is always set if empty
        if not self.profile_image:
            self.profile_image = 'defaults/default_avatar.png'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class PasswordResetOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="otp_codes")
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    @property
    def is_expired(self):
        return self.created_at + timedelta(minutes=10) < timezone.now()  # valid for 10 mins

    def __str__(self):
        return f"{self.user.username} - {self.code} ({'used' if self.is_used else 'active'})"

    @staticmethod
    def generate_otp():
        return str(random.randint(1000, 9999))
    
