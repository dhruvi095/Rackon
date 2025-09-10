# shelves/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from products.models import Product
from .models import ShelfInventory
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=Product)
def update_shelf_inventory(sender, instance, created, **kwargs):
    shelf = instance.shelf
    brand = instance.brand
    if shelf:
        # Update or create inventory
        inventory, _ = ShelfInventory.objects.get_or_create(
            shelf=shelf, product=instance, brand=brand,
            defaults={'quantity': instance.quantity_stored}
        )
        # If exists, update quantity
        if not created:
            inventory.quantity = instance.quantity_stored
            inventory.save()

@receiver(post_delete, sender=Product)
def delete_shelf_inventory(sender, instance, **kwargs):
    ShelfInventory.objects.filter(shelf=instance.shelf, product=instance, brand=instance.brand).delete()


@receiver(post_save, sender=Product)
def notify_inventory_change(sender, instance, created, **kwargs):
    if instance.shelf:
        channel_layer = get_channel_layer()
        data = {
            "id": instance.id,
            "product_name": instance.product_name,
            "quantity_stored": instance.quantity_stored,
            "quantity_sold": instance.quantity_sold,
            "price_per_unit": str(instance.price_per_unit),
        }
        async_to_sync(channel_layer.group_send)(
            f"shelf_{instance.shelf.id}",
            {"type": "send_inventory_update", "data": data}
        )
