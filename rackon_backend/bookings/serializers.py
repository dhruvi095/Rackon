from rest_framework import serializers
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

    class Meta:
        model = Booking
        fields = [
            "id",
            "shelf",
            "shelf_name",
            "start_date",
            "end_date",
            "status",
            "amount",
            "created_at",
            "updated_at",
            "payment_status",  
        ]
        
    def get_amount(self, obj):
        # Return shelf rent if available
        return getattr(obj.shelf, "rent", 0)
    
    def get_payment_status(self, obj):
        if hasattr(obj, "payment"):
            return obj.payment.status
        return None


class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('status',)
    
    def validate_status(self, value):
        if value not in ['accepted', 'rejected']:
            raise serializers.ValidationError("Status must be 'accepted' or 'rejected'.")
        return value



