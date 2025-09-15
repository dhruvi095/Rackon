from django.urls import path
from .views import *

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
     path("products/<int:product_id>/sell/", sell_product, name="sell_product"),
]
