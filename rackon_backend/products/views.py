# products/views.py
from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from products.services import record_sale


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




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def sell_product(request, product_id):
    sold_qty = int(request.data.get("sold_qty", 0))
    if sold_qty <= 0:
        return Response({"error": "Invalid sold quantity"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = record_sale(product_id, sold_qty)
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        "id": product.id,
        "product_name": product.product_name,
        "quantity_stored": product.quantity_stored,
        "quantity_sold": product.quantity_sold,
        "price_per_unit": str(product.price_per_unit),
    }, status=status.HTTP_200_OK)
