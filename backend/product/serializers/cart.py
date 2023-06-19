from rest_framework import serializers
from ..models import CartProduct, ProductImage #Review

class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.title')
    images = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    product_slug = serializers.CharField(source='product.slug')
    seller = serializers.CharField(source='product.seller')
    # rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CartProduct
        fields = (
            'slug',
            'product_name',
            'product_slug',
            'user',
            'seller',
            'quantity',
            'images',
            'price',
            'quantity',
            # 'rating'
        )

    def get_images(self, obj):
        images = ProductImage.objects.filter(product__slug=obj.product.slug).values()
        return images

    def get_price(self, obj: CartProduct):
        return obj.net_price()

    # def get_rating(self, obj):
    #     reviews = Review.objects.filter(product__slug=obj.product.slug)
    #     stars = [i.stars for i in reviews]
    #     if self.custom_mean(stars) != None: 
    #         return self.custom_mean(stars)

    def custom_mean(self, l):
        if len(l) == 0:
            return
        return sum(l) / len(l)