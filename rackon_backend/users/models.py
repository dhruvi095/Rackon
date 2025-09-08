from django.contrib.auth.models import AbstractUser
from django.db import models

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