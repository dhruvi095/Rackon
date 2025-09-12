from rest_framework import serializers
from .models import Shelf, ShelfImage, ShelfInventory
from products.models import Product
from products.serializers import ProductSerializer
from users.models import User

class ShelfImageSerializer(serializers.ModelSerializer):
    # ✅ Return full URL instead of just relative path
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ShelfImage
        fields = ['id', 'image', 'uploaded_at']
        
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ShelfSerializer(serializers.ModelSerializer):
    images = ShelfImageSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)  # this is the main shelf image

    class Meta:
        model = Shelf
        fields = "__all__"
        read_only_fields = ('owner', 'created_at', 'updated_at')

    def create(self, validated_data):
        # Handle main shelf image
        image_file = validated_data.pop('image', None)
        shelf = Shelf.objects.create(**validated_data)
        if image_file:
            shelf.image = image_file
            shelf.save()
        return shelf

    def update(self, instance, validated_data):
        image_file = validated_data.pop('image', None)
        instance = super().update(instance, validated_data)
        if image_file:
            instance.image = image_file
            instance.save()
        return instance



class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Customize fields as needed

class SimpleShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = ['id', 'name', 'location', 'rent']

class ShelfInventorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), 
        source='product', 
        write_only=True
    )
    shelf = SimpleShelfSerializer(read_only=True)
    brand = SimpleUserSerializer(read_only=True)

    # Flatten important fields for easier frontend consumption
    shelf_name = serializers.CharField(source='shelf.name', read_only=True)
    brand_name = serializers.CharField(source='brand.username', read_only=True)

    quantity_stored = serializers.IntegerField(source='quantity', read_only=True)
    quantity_sold = serializers.IntegerField(source='product.quantity_sold', read_only=True)
    price_per_unit = serializers.DecimalField(
        source='product.price_per_unit', 
        max_digits=10, 
        decimal_places=2, 
        read_only=True
    )
    total_payment = serializers.SerializerMethodField()

    class Meta:
        model = ShelfInventory
        fields = [
            'id', 'shelf', 'shelf_name', 'brand', 'brand_name',
            'product', 'product_id',
            'quantity_stored', 'quantity_sold', 'price_per_unit', 'total_payment',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['brand', 'shelf']

    def get_total_payment(self, obj):
        return float(obj.quantity * obj.product.price_per_unit)
