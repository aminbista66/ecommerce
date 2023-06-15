from typing import Iterable, Optional
from django.db import models
from django.utils.text import slugify
from user.models import User


class Product(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    slug = models.SlugField()
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
        return self.title + '- by' + self.seller

    def save(self, force_insert: bool = ..., force_update: bool = ..., using: str | None = ..., update_fields: Iterable[str] | None = ...) -> None:
        self.slug = slugify(self.title + self.seller.first_name)
        return super().save(force_insert, force_update, using, update_fields)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.URLField()

    def __str__(self) -> str:
        return self.product + ' | image'

class CartProduct(models.Model):
    slug = models.SlugField(
        primary_key=True, unique=True, blank=False, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(blank=False, null=False, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def net_price(self):
        self.quantity * self.product.net_price()

    def save(self, force_insert: bool = ..., force_update: bool = ..., using: str | None = ..., update_fields: Iterable[str] | None = ...) -> None:
        self.slug = slugify(self.product.title + '- cart')
        return super().save(force_insert, force_update, using, update_fields)

class Order(models.Model):
    pass