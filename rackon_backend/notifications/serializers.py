<<<<<<< HEAD
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
=======
# notifications/serializers.py
from rest_framework import serializers
from .models import Notification
from bookings.serializers import BookingSerializer


class NotificationSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)  # ✅ nested booking

>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('recipient', 'created_at', 'is_read')
