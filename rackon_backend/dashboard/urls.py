from django.urls import path
from .views import OwnerDashboardView, BrandDashboardView

urlpatterns = [
    path('owner/', OwnerDashboardView.as_view(), name='owner-dashboard'),
    path('brand/', BrandDashboardView.as_view(), name='brand-dashboard'),
]
