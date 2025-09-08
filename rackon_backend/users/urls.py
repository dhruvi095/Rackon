<<<<<<< HEAD

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
=======
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import *
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/upload_image/', ProfileImageUploadView.as_view(), name='upload_profile_image'),
    path("forgot-password/", forgot_password, name="forgot_password"),
    path("verify-otp/", verify_otp, name="verify_otp"),
    path("reset-password/", reset_password, name="reset_password"),
    path("get-email/", get_email_from_username, name="get_email_from_username"),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
