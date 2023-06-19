from rest_framework import serializers
from ..models import Product, Review

class ProductSerializer(serializers.ModelSerializer):
    net_price = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'slug',
            'title',
            'description',
            'seller',
            'quantity',
            'price',
            'discount_percent',
            'net_price',
            'rating',
        )

    def get_rating(self, obj: Product):
        return Review.objects.filter(product__slug=obj.slug).values()

    def get_net_price(self, obj: Product):
        return obj.net_price()