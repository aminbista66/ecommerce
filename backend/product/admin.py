from django.contrib import admin
from .models import Product, ProductImage, CartProduct, Order, Review

class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'title',
        'created_at',
        'seller',
        'price',
        'discount_percent',
        'quantity',
        'net_price',
    )

    def net_price(self, obj: Product):
        return obj.net_price()

class ProductImageAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'image',
    )

class CartProductAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'product',
        'user',
        'quantity',
        'price',
        'net_price',
    )

    def price(self, obj: CartProduct):
        return obj.product.net_price()

    def net_price(self, obj:CartProduct):
        return obj.net_price()

class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'user',
        'created_at',
        'state',
        'quantity',
    )

admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(CartProduct, CartProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Review)