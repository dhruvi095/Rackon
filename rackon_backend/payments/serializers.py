from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'booking', 'user', 'amount', 'payment_type', 'payment_gateway_id', 'status', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'status', 'payment_gateway_id', 'created_at', 'updated_at')
