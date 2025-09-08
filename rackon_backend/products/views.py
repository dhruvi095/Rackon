# products/views.py
from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Brand sees only their products, owner sees products in their shelves
        if user.is_shelf_owner:
            return Product.objects.filter(shelf__owner=user)
        return Product.objects.filter(brand=user)

    def perform_create(self, serializer):
        serializer.save(brand=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_shelf_owner:
            return Product.objects.filter(shelf__owner=user)
        return Product.objects.filter(brand=user)
