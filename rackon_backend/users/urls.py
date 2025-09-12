from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/upload_image/', ProfileImageUploadView.as_view(), name='upload_profile_image'),
    path("forgot-password/", forgot_password, name="forgot_password"),
    path("verify-otp/", verify_otp, name="verify_otp"),
    path("reset-password/", reset_password, name="reset_password"),
    path("get-email/", get_email_from_username, name="get_email_from_username"),
    path('profile/', get_user_profile, name='get_user_profile'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='update_user_profile'),  
    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
