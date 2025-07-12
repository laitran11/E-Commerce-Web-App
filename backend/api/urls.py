from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductsListView.as_view(), name='products-list'),
    path('categories/', views.CategoriesListView.as_view(), name='categories-list'),
    path('products/<str:pk>/', views.ProductDetailView.as_view(),name='product_detail'),
    path('categories/<int:pk>/', views.CategoriesDetailView.as_view(), name='category_detail'),
    path('cart/', views.UserCartView.as_view(), name='cart'),
    path('cart-items/<int:pk>/', views.CartItemDetailView.as_view(), name='cart_items'),
    path('categories/parent/<str:parent_id>/', views.CategoriesByParentView.as_view(), name='categories_by_parent'),
]