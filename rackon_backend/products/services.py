# products/services.py
from django.db import transaction
from products.models import Product
from shelves.models import ShelfInventory

def record_sale(product_id, sold_qty):
    with transaction.atomic():
        product = Product.objects.select_for_update().get(id=product_id)

        if product.quantity_stored < sold_qty:
            raise ValueError("Not enough inventory to sell")

        # Update product stock
        product.quantity_stored -= sold_qty
        product.quantity_sold += sold_qty
        product.save()

        # 🔥 Update ShelfInventory
        inventory = ShelfInventory.objects.get(
            shelf=product.shelf, product=product, brand=product.brand
        )
        inventory.quantity = product.quantity_stored
        inventory.save()

    return product
