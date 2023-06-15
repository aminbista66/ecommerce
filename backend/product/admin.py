from django.contrib import admin
from .models import Product, ProductImage, CartProduct

class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'title',
        'created_at',
        'seller',
        'price',
        'discount_percent',
        'quantity',
    )

admin.site.register(Product, ProductAdmin)