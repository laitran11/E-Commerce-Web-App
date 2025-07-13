
from .models import Products, Categories, Carts, CartItems
from .serializers import ProductsSerializer, CategoriesSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagnination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductsListView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        queryset = Products.objects.all()
        # Filtering
        name = request.query_params.get('name')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')

        if name:
            queryset = queryset.filter(product_name__icontains=name)
        if min_price:
            queryset = queryset.filter(actual_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(actual_price__lte=max_price)
        
        # filter product by category_id
        category_id = request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        # Sorting 
        sort = request.query_params.get('sort')
        if sort == 'price_asc':
            queryset = queryset.order_by('actual_price')
        if sort == 'price_desc':
            queryset = queryset.order_by('-actual_price')

        # Pagination
        paginator = CustomPagnination()
        paginator.page_size = 30
        result_page = paginator.paginate_queryset(queryset, request)


        serializer = ProductsSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    permission_classes = [AllowAny]
    def get_object(self,pk):
        try:
            return Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return None
    def get(self,request, pk):
        product = self.get_object(pk)    
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer =ProductsSerializer(product)
        return Response(serializer.data)
    def put(self,request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductsSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk):
        product = self.get_object(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoriesListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        categories = Categories.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoriesDetailView(APIView):
    permission_classes = [AllowAny]
    def get_object(self,pk):
        try:
            return Categories.objects.get(pk=pk)
        except Categories.DoesNotExist:
            return None
    def get(self,request,pk):
        category = self.get_object(pk)
        if not category:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategoriesSerializer(category)
        return Response(serializer.data)
    def put(self,request,pk):
        category = self.get_object(pk)
        if not category: 
            return Response({"error": 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategoriesSerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request,pk):
        category = self.get_object(pk)
        if not category:
            return Response({'error':'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoriesByParentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, parent_id=None):
        if parent_id == "null":
            categories = Categories.objects.filter(parent__isnull=True)
        else:
            categories = Categories.objects.filter(parent_id=parent_id)

        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data)


class UserCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Carts.objects.get_or_create(user=request.user)
        cart_items = CartItems.objects.filter(cart=cart)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        cart, _ = Carts.objects.get_or_create(user=request.user)
        product = get_object_or_404(Products, pk=request.data.get('product_id'))

        cart_item, created = CartItems.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                'quantity': request.data.get('quantity', 1),
                'price': product.actual_price,
            }
        )

        if not created:
            cart_item.quantity += int(request.data.get('quantity', 1))
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        cart_item = get_object_or_404(CartItems, pk=pk)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    def put(self, request, pk):
        cart = get_object_or_404(Carts, user=request.user)
        cart_item = get_object_or_404(CartItems, pk=pk, cart=cart)
        cart_item.quantity = request.data.get('quantity', cart_item.quantity)
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    def delete(self, request, pk):
        cart = get_object_or_404(Carts, user=request.user)
        cart_item = get_object_or_404(CartItems, pk=pk, cart=cart)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)