import django_filters
from .models import Shelf

class ShelfFilter(django_filters.FilterSet):
    min_rent = django_filters.NumberFilter(field_name="rent", lookup_expr='gte')
    max_rent = django_filters.NumberFilter(field_name="rent", lookup_expr='lte')
    location = django_filters.CharFilter(field_name="location", lookup_expr='icontains')
    
    class Meta:
        model = Shelf
        fields = ['location', 'size', 'visibility', 'is_active']
