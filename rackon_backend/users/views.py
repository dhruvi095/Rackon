from rest_framework import generics, permissions, status
from .serializers import *
from .models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
# Custom login view
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer    

class ProfileImageUploadView(generics.UpdateAPIView):
    serializer_class = ProfileImageUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        """Upload/replace profile image"""
        return super().partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """Remove/reset profile image to default"""
        user = self.get_object()

        # Delete the existing image from storage if it exists
        if user.profile_image and user.profile_image.name != 'defaults/default_avatar.png':
            user.profile_image.delete(save=False)

        # Reset to default avatar
        user.profile_image = 'defaults/default_avatar.png'
        user.save(update_fields=["profile_image"])

        return Response(
            {"detail": "Profile image reset to default."},
            status=status.HTTP_200_OK
        )
        

@api_view(['POST'])
def forgot_password(request):
    serializer = PasswordResetRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    otp_code = PasswordResetOTP.generate_otp()
    PasswordResetOTP.objects.create(user=user, code=otp_code)

    print(f"[DEBUG] OTP for {email}: {otp_code}", flush=True)  # For debugging purposes

    # Send email (make sure SMTP is configured)
    # send_mail(
    #     subject="Your Rackon OTP Code",
    #     message=f"Your OTP for password reset is {otp_code}. It is valid for 10 minutes.",
    #     from_email="no-reply@rackon.com",
    #     recipient_list=[email],
    #     fail_silently=False,
    # )

    return Response({"message": f"OTP generated for {email}. Check server terminal."})


@api_view(['POST'])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']
    otp = serializer.validated_data['otp']

    try:
        user = User.objects.get(email=email)
        otp_entry = PasswordResetOTP.objects.filter(user=user, code=otp, is_used=False).last()
        if not otp_entry:
            return Response({"message": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        if otp_entry.is_expired:
            return Response({"message": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

        # Do not mark as used here
        return Response({"message": "OTP verified successfully"});
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def reset_password(request):
    serializer = PasswordResetSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data['email']
    otp = serializer.validated_data['otp']
    new_password = serializer.validated_data['new_password']

    try:
        user = User.objects.get(email=email)
        otp_entry = PasswordResetOTP.objects.filter(user=user, code=otp, is_used=False).last()
        if not otp_entry:
            return Response({"message": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        if otp_entry.is_expired:
            return Response({"message": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        otp_entry.is_used = True
        otp_entry.save()

        return Response({"message": "Password reset successfully"});
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def get_email_from_username(request):
    username = request.data.get('username')
    if not username:
        return Response({"message": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
        return Response({"email": user.email})
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_user_profile(request):
    user = request.user
    profile_data = {
        "name": user.username,
        "email": user.email,
        "phone": user.phone_number,  # Make sure this field exists in your User model
        "image": user.profile_image.url if user.profile_image else None,
    }
    return Response(profile_data)


class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        # Update user fields
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.phone_number = data.get('phone_number', user.phone_number)

        user.save()

        return Response({
            "name": user.username,
            "email": user.email,
            "phone": user.phone_number,
            "image": user.profile_image.url if user.profile_image else None,
        })


