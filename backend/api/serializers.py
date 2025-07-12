from rest_framework import serializers
from .models import Products, Categories, Carts, CartItems

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
     # Accepts ID for writes
    category = serializers.PrimaryKeyRelatedField(queryset=Categories.objects.all())
    # Shows full category info for reads
    category_detail = CategoriesSerializer(source='category', read_only=True)
    class Meta:
        model = Products
        fields = [
            'product_id',
            'product_name',
            'description',
            'image_url',
            'product_url',
            'discount_price',
            'actual_price',
            'rating',
            'category',         # for write
            'category_detail',  # for read
        ]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)
    product_id = serializers.CharField(write_only=True)

    class Meta:
        model = CartItems
        fields = ['id', 'product', 'product_id', 'quantity', 'price']