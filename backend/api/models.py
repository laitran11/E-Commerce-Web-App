from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categories(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.TextField()
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories'
    )
    class Meta:
        db_table = 'categories'
    def __str__(self):
        return self.category_name

class Products(models.Model):
    product_id = models.CharField(primary_key=True, max_length=10)
    product_name = models.TextField()
    description = models.TextField()
    image_url = models.TextField()
    product_url = models.TextField()
    discount_price = models.DecimalField(max_digits=10, decimal_places=2)
    actual_price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Categories, on_delete=models.CASCADE
    )
    class Meta:
        db_table = 'products'
    def __str__(self):
        return self.product_name
    
class Carts(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True
    )
    def __str__ (self):
        return f"Cart for {self.user.username}"


class CartItems(models.Model):
    cart = models.ForeignKey(Carts, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('cart', 'product')

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"