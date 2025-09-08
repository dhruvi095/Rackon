from django.db import models
<<<<<<< HEAD
from users.models import User
from shelves.models import Shelf
from django.utils.timezone import now
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from notifications.models import Notification

=======
from django.utils.timezone import now
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.exceptions import ValidationError

from users.models import User
from shelves.models import Shelf
from products.models import Product
from notifications.models import Notification
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
<<<<<<< HEAD
        ('expired', 'Expired')
=======
        ('expired', 'Expired'),
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
    )

    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='bookings')
    brand = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
<<<<<<< HEAD
    
=======
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

    def __str__(self):
        return f"{self.brand.username} -> {self.shelf.name} ({self.status})"

<<<<<<< HEAD
def update_shelf_availability(shelf):
    # Shelf is available if it has no active/pending/accepted bookings
    has_active_bookings = shelf.bookings.filter(status__in=['pending', 'accepted']).exists()
    shelf.currently_available = not has_active_bookings
    shelf.save(update_fields=['currently_available'])

@receiver(post_save, sender=Booking)
def booking_saved(sender, instance, **kwargs):
    update_shelf_availability(instance.shelf)

@receiver(post_delete, sender=Booking)
def booking_deleted(sender, instance, **kwargs):
    update_shelf_availability(instance.shelf)
    
    from django.db import models
from users.models import User
from shelves.models import Shelf
from django.utils.timezone import now
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from notifications.models import Notification


class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired')
    )

    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='bookings')
    brand = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand.username} -> {self.shelf.name} ({self.status})"


# ✅ Shelf availability updater
def update_shelf_availability(shelf):
    has_active_bookings = shelf.bookings.filter(status__in=['pending', 'accepted']).exists()
    shelf.currently_available = not has_active_bookings
    shelf.save(update_fields=['currently_available'])


@receiver(post_save, sender=Booking)
def booking_saved(sender, instance, created, **kwargs):
    update_shelf_availability(instance.shelf)


@receiver(post_delete, sender=Booking)
def booking_deleted(sender, instance, **kwargs):
    update_shelf_availability(instance.shelf)

    # ✅ Notify brand that their booking was deleted
    Notification.objects.create(
        recipient=instance.brand,
        type="booking",
        message=f"Your booking for {instance.shelf.name} was deleted."
    )
    
    
@receiver(post_save, sender=Booking)
def booking_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            recipient=instance.shelf.owner,  # retailer gets notified
            type="booking",
            message=f"New booking request from {instance.brand.username} for {instance.shelf.name}."
        )
    else:
        if instance.status in ["accepted", "rejected", "cancelled", "expired"]:
            Notification.objects.create(
                recipient=instance.brand,  # brand gets notified
                type="booking",
                message=f"Your booking for {instance.shelf.name} was {instance.status}."
            )
=======
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

>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
