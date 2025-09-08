from rest_framework import serializers
<<<<<<< HEAD
from .models import User
from django.contrib.auth.password_validation import validate_password
=======
from .models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User, PasswordResetOTP
from django.contrib.auth.password_validation import validate_password

>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    email = serializers.EmailField(required=True)
<<<<<<< HEAD

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role')
=======
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'profile_image')

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image:
            return request.build_absolute_uri(obj.profile_image.url)
        return request.build_absolute_uri('/media/defaults/default_avatar.png')
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
<<<<<<< HEAD
            role=validated_data['role']
=======
            role=validated_data['role'],
            profile_image=validated_data.get('profile_image') or 'defaults/default_avatar.png'
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
<<<<<<< HEAD
=======


# Custom login serializer (adds user data to response)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Optional: add extra fields inside the token
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        request = self.context.get('request')  # get request to build full URL
        profile_image_url = request.build_absolute_uri(self.user.profile_image.url) if self.user.profile_image else None

        data['user'] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": self.user.role,
            "profile_image": profile_image_url
        }
        return data
    
    

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, required=True)

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
 
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
