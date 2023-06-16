from django.db import models
from django.utils.text import slugify
from user.models import User
import uuid

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    slug = models.SlugField(null=True, blank=True)
    title = models.CharField(max_length=526, null=False, blank=False)
    description = models.CharField(max_length=1080*4)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    quantity = models.PositiveIntegerField(null=False, default=1, blank=False)
    price = models.FloatField(null=False, blank=False)
    discount_percent = models.FloatField(null=False, blank=False, default=0)

    def net_price(self):
        return (self.price - self.discount_percent * 0.01 * self.price)

    def __str__(self) -> str:
        return self.slug

    def save(self, *args, **kwargs):
        self.slug = slugify('product-' + self.title + str(uuid.uuid4())[:4])
        return super().save(*args, **kwargs)

class ProductImage(models.Model):
    id = models.BigAutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.URLField()

    def __str__(self) -> str:
        return self.product + ' | image'

class CartProduct(models.Model):
    id = models.BigAutoField(primary_key=True)
    slug = models.SlugField(blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(blank=False, null=False, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.slug

    def net_price(self):
        return self.quantity * self.product.net_price()

    def save(self, *args, **kwargs):
        self.slug = slugify('cart-' + self.product.title + str(uuid.uuid4())[:4])
        return super().save(*args, **kwargs)

class Order(models.Model):
    ORDER_STATE = (
        ('PR', 'Preparing'),
        ('SH', 'Shipped'),
        ('SC', 'Successful'),
        ('CL', 'Cancelled')
    )
    slug = models.SlugField(blank=True, null=True)
    product = models.ForeignKey(CartProduct, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=255, choices=ORDER_STATE, default='PR')

    def __str__(self) -> str:
        return self.slug

    def net_price(self):
        pass

    def save(self, *args, **kwargs):
        self.slug = slugify('order-' + self.product.product.title + str(uuid.uuid4())[:4])
        return super().save(*args, **kwargs)