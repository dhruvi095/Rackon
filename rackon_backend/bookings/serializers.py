from rest_framework import serializers
from shelves.serializers import *
from users.serializers import *
from .models import Booking
from shelves.models import Shelf
from users.models import User  # Import the User model

# Define a simple User serializer
class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Include necessary fields


class BookingSerializer(serializers.ModelSerializer):
    shelf_name = serializers.CharField(source="shelf.name", read_only=True)
    payment_status = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()
    shelf = ShelfSerializer(read_only=True)
    renter = UserSerializer(source="brand", read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'shelf', 'shelf_name', 'start_date', 'end_date',
                  'status', 'amount', 'payment_status', 'renter']
        read_only_fields = ['status', 'amount', 'payment_status', 'renter']
    def get_amount(self, obj):
        # Return shelf rent if available
        return getattr(obj.shelf, "rent", 0)
    
    def get_payment_status(self, obj):
        return obj.payment.status if hasattr(obj, "payment") and obj.payment else None

    def get_shelf(self, obj):
        return {
            "id": obj.shelf.id,
            "name": obj.shelf.name,
        }


class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('status',)
    
    def validate_status(self, value):
        if value not in ['accepted', 'rejected']:
            raise serializers.ValidationError("Status must be 'accepted' or 'rejected'.")
        return value



class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'shelf', 'start_date', 'end_date', 'status']
        extra_kwargs = {
            'status': {'read_only': True},  # status will always start as 'pending'
        }

class ShelfMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = ['id', 'name', 'image']

class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class BookingReadSerializer(serializers.ModelSerializer):
    shelf = ShelfMiniSerializer(read_only=True)
    brand = UserMiniSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
