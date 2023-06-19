from django.db.models import Q, F

from rest_framework.response import Response
from rest_framework import views
from rest_framework import generics
from rest_framework import permissions

from .models import Product, CartProduct
from user.models import User
from user.utils import get_user

from .serializers import product, cart
import random

'''
    - Listing,  [DONE]
    - Detail,   [DONE]
    - Add To Cart, [DONE]
    - Create Order
    - increase / decrease quantity [DONE]
    - cancel order,
    - payment,
'''


class ListProductView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = product.ProductSerializer
    queryset = Product.objects.all().order_by('id')


class DeatilProductView(generics.RetrieveAPIView):
    serializer_class = product.ProductSerializer
    permission_class = [permissions.AllowAny]
    queryset = Product.objects.all()
    lookup_field = 'slug'


class AddToCartView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = get_user(request)
        user = User.objects.get(id=user_id)

        product_list = Product.objects.filter(slug=kwargs.get('slug'))

        if product_list.exists():
            product = product_list.first()

            if product.quantity == 0:
                return Response({"message": "Product Out Of Stock"}, status=300)

            cart_product_list = CartProduct.objects.filter(
                Q(user=user) & Q(product__slug=kwargs.get('slug')))

            if int(product.quantity) < int(request.data.get('quantity')):
                return Response({"message": "not enough in stock"})

            if cart_product_list.exists():
                cart_product = cart_product_list.first()
                if int(cart_product.quantity) + int(request.data.get('quantity')) > int(product.quantity):
                    return Response({'message': 'not enough in stock'})

                cart_product.quantity = F(
                    'quantity') + request.data.get('quantity')
                cart_product.save()
                return Response({"message": f"total quantity {cart_product_list.first().quantity}", "quantity added": f'{request.data.get("quantity")}'})

            CartProduct.objects.create(
                product=product,
                user=User.objects.get(id=get_user(request)),
                quantity=request.data.get('quantity')
            )

            return Response({"message": "Product Successfully Added To Cart"}, status=200)

class ListCartProductView(generics.ListAPIView):
    permission_class = [permissions.IsAuthenticated]
    serializer_class = cart.CartSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = CartProduct.objects.filter(user__id=get_user(self.request))
        return qs