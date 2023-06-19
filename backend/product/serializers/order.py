from rest_framework import serializers
from ..models import Order

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = (
            'slug',
            'product',
            'user',
            'state',
            'phone',
            'address',
            'city',
            'postal_code',
        )

    def get_user(self, obj: Order):
        return obj.user.email
    def get_product(self, obj: Order):
        return obj.product.slug