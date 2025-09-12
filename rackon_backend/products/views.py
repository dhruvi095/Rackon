# products/views.py
from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Product.objects.all()

        # 🔹 check user.role instead of is_shelf_owner
        if user.role == "owner":
            queryset = queryset.filter(shelf__owner=user)
        else:  # default to brand
            queryset = queryset.filter(brand=user)

        # 🔹 allow ?shelf=... query param
        shelf_id = self.request.query_params.get("shelf")
        if shelf_id:
            queryset = queryset.filter(shelf_id=shelf_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(brand=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "owner":
            return Product.objects.filter(shelf__owner=user)
        return Product.objects.filter(brand=user)
