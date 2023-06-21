from rest_framework import serializers
from ..models import Product, Review, ProductImage
from user.models import User

class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['product', 'feedback', 'stars', 'user']

    def get_product(self, obj: Review):
        return obj.product.slug

    def get_user(self, obj: Review):
        return obj.user.email

class ProductSerializer(serializers.ModelSerializer):
    net_price = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    seller = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

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
            'reviews',
            'images',
        )

    def get_images(self, obj: Product):
        return ProductImage.objects.filter(product__slug=obj.slug).values()

    def get_seller(self, obj: Product):
        return f'{obj.seller.first_name} {obj.seller.last_name}'
    def get_reviews(self, obj: Product):
        review = Review.objects.filter(product__slug=obj.slug)
        return ReviewSerializer(review, many=True).data

    def get_rating(self, obj: Product):
        reviews = Review.objects.filter(product__slug=obj.slug)
        stars = [i.stars for i in reviews]
        if self.custom_mean(stars) != None: 
            return self.custom_mean(stars)
        return 0

    def custom_mean(self, stars):
        if len(stars) == 0:
            return
        return sum(stars) / len(stars)

    def get_net_price(self, obj: Product):
        return obj.net_price()
