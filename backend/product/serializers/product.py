from rest_framework import serializers
from ..models import Product

class ProductSerializer(serializers.ModelSerializer):
    net_price = serializers.SerializerMethodField()

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
        )

    def get_net_price(self, obj: Product):
        return obj.net_price()