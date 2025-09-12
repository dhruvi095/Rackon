
from bookings.models import Booking
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.username', read_only=True)
    shelf_name = serializers.CharField(source='shelf.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'product_name', 'brand', 'brand_name',
            'shelf', 'shelf_name', 'booking',
            'quantity_stored', 'quantity_sold', 'price_per_unit',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['brand', 'created_at', 'updated_at']

    def get_quantity_sold(self, obj):
        # Example: if you track sales in an Order model
        return obj.orders.aggregate(total=models.Sum("quantity"))["total"] or 0