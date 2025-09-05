# notifications/serializers.py
from rest_framework import serializers
from .models import Notification
from bookings.serializers import BookingSerializer


class NotificationSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)  # ✅ nested booking

    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('recipient', 'created_at', 'is_read')
