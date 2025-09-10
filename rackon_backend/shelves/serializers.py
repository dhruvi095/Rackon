from rest_framework import serializers
from .models import Shelf, ShelfImage, ShelfInventory
from products.models import Product
from products.serializers import ProductSerializer


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


# shelves/serializers.py

class ShelfInventorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)

    class Meta:
        model = ShelfInventory
        fields = ['id', 'shelf', 'brand', 'product', 'product_id', 'quantity', 'created_at', 'updated_at']
        read_only_fields = ['brand', 'shelf']
