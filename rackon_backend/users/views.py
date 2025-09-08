from rest_framework import generics, permissions, status
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
# Custom login view
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer    

class ProfileImageUploadView(generics.UpdateAPIView):
    serializer_class = UserSerializer
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