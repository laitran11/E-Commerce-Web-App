
import django_filters
from .models import Products

class ProductFilter(django_filters.FilterSet):
    product_name = django_filters.CharFilter(lookup_expr='icontains')
    min_price = django_filters.NumberFilter(field_name='actual_price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='actual_price', lookup_expr='lte')

    class Meta:
        model = Products
        fields = ['product_name', 'min_price', 'max_price']
