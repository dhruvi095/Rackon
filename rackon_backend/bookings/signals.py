# bookings/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from bookings.models import Booking
from notifications.models import Notification
from bookings.utils import update_shelf_availability
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from bookings.serializers import BookingSerializer
from notifications.serializers import NotificationSerializer 


# 🔔 WebSocket notifier
def send_ws_notification(user_id, data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",
        {
            "type": "send_notification",
            "content": NotificationSerializer(notif).data, # serialize notification
        }
    )


@receiver(post_save, sender=Booking)
def booking_saved(sender, instance, created, **kwargs):
    update_shelf_availability(instance.shelf)

    if created:
        # Notify shelf owner of new booking
        notif = Notification.objects.create(
            recipient=instance.shelf.owner,
            type="booking",
            message=f"📌 New booking request from {instance.brand.username} for shelf {instance.shelf.name}.",
            booking=instance  # ✅ linked booking
        )
        # Push via WebSocket
        send_ws_notification(instance.shelf.owner.id, {
            "id": notif.id,
            "message": notif.message,
            "type": notif.type,
            "created_at": str(notif.created_at),
            "booking": BookingSerializer(instance).data,  # ✅ include booking details for frontend lookup
        })

    else:
        if instance.status in ["accepted", "rejected", "cancelled", "expired"]:
            # Notify brand of booking status change
            notif = Notification.objects.create(
                recipient=instance.brand,
                type="booking",
                message=f"ℹ️ Your booking for {instance.shelf.name} was {instance.status}.",
                booking=instance  # ✅ linked booking
            )
            send_ws_notification(instance.brand.id, {
                "id": notif.id,
                "message": notif.message,
                "type": notif.type,
                "created_at": str(notif.created_at),
                "booking": BookingSerializer(instance).data,
            })


@receiver(post_delete, sender=Booking)
def booking_deleted(sender, instance, **kwargs):
    update_shelf_availability(instance.shelf)

    # Notify brand that their booking was deleted
    notif = Notification.objects.create(
        recipient=instance.brand,
        type="booking",
        message=f"❌ Your booking for {instance.shelf.name} was deleted.",
        booking=instance  # ✅ still link (though deleted, ID is useful)
    )
    send_ws_notification(instance.brand.id, {
        "id": notif.id,
        "message": notif.message,
        "type": notif.type,
        "created_at": str(notif.created_at),
        "booking": instance.id,
    })
