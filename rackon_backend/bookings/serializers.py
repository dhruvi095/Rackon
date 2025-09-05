from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    brand = serializers.StringRelatedField(read_only=True)
    shelf_name = serializers.CharField(source='shelf.name', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('brand', 'created_at', 'shelf', 'start_date', 'end_date')

class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('status',)
    
    def validate_status(self, value):
        if value not in ['accepted', 'rejected']:
            raise serializers.ValidationError("Status must be 'accepted' or 'rejected'.")
        return value
