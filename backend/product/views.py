from django.db.models import Q, F
from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank

from rest_framework.response import Response
from rest_framework import views
from rest_framework import generics
from rest_framework import permissions

from .models import Product, CartProduct, Order, Review
from user.models import User
from user.utils import get_user

from .serializers import product, cart, order
import random

'''
    - Listing,  [DONE]
    - Detail,   [DONE]
    - Add To Cart, [DONE]
    - Create Order [DONE]
    - increase / decrease quantity [DONE]
    - cancel order, [DONE]
    - payment, 
'''


class ListProductView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = product.ProductSerializer
    queryset = Product.objects.all().order_by('id')


class DeatilProductView(generics.RetrieveAPIView):
    serializer_class = product.ProductSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    lookup_field = 'slug'


class SearchProductView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, *args, **kwargs):
        query = self.request.GET.get('q')
        search_query = SearchQuery(query)
        search_vector = SearchVector('title', 'description')
        queryset = Product.objects.annotate(
            search=search_vector, rank=SearchRank(search_vector, search_query)
        ).filter(search=search_query).order_by('-rank')
        searializer = product.ProductSerializer(queryset, many=True)
        return Response(searializer.data, status=200)


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
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = cart.CartSerializer
    lookup_field = 'slug'
    

    def get_queryset(self):
        qs = CartProduct.objects.filter(user__id=get_user(self.request)).order_by('slug')
        return qs


class DeleteCartProductView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'

    def get_queryset(self):
        user = User.objects.get(id=get_user(self.request))
        qs = CartProduct.objects.filter(user=user)
        return qs

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "successfully deleted"}, status=204)


class DecreaseQuantityView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart_product = CartProduct.objects.filter(slug=kwargs.get('slug'))

        if cart_product.exists():
            cart_product_ = cart_product.first()

            if cart_product_.quantity < int(request.data['quantity']):
                return Response({"message": "cart product quantity is less than the given quantity"})

            if cart_product_.quantity == int(request.data['quantity']):
                return Response({"message": "cant remove all the quantity, must have atleast one or remove the product"})

            cart_product_.quantity = F(
                'quantity') - int(request.data.get('quantity'))
            cart_product_.save()
            return Response({"quantity": f'{cart_product.first().quantity}', 'decreased quantity': f'{request.data.get("quantity")}'})
        return Response({"message": "Product not Found"}, status=404)


class IncreaseQuantityView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart_product = CartProduct.objects.filter(slug=kwargs.get('slug'))

        if cart_product.exists():
            cart_product_ = cart_product.first()
            product = Product.objects.get(slug=cart_product_.product.slug)

            if int(cart_product_.quantity) + int(request.data['quantity']) > int(product.quantity):
                return Response({"message": "not enough in stock"})

            if int(product.quantity) < int(request.data.get('quantity')):
                return Response({"message": "not enough in stock"})

            cart_product_.quantity = F(
                'quantity') + int(request.data.get('quantity'))
            cart_product_.save()
            return Response({"quantity": f'{cart_product.first().quantity}', 'added quantity': f'{request.data.get("quantity")}'})
        return Response({"message": "Product not Found"}, status=404)

class CreateOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, *args, **kwargs):
        cart_product_list = CartProduct.objects.filter(slug=kwargs.get('slug'))

        if cart_product_list.exists():
            cart_product = cart_product_list.first()
            data : dict = self.request.data
            detail_object = {
                'phone': data.get('phone'),
                'address': data.get('address'),
                'city': data.get('city'),
                'postal_code': data.get('postal_code')
            }
            if any(value is None for value in detail_object.values()):
                return Response({'message': 'checkout detail missing'}, status=403)
            orderqs = Order.objects.create(
                product = cart_product.product,
                user = User.objects.get(id=get_user(self.request)),
                quantity = cart_product.quantity,
                **detail_object
            )
            product = cart_product.product
            product.quantity = F('quantity') - cart_product.quantity
            product.save()
            cart_product_list.delete()
            serializer = order.OrderSerializer(orderqs)
            return Response({'message': 'Order created', 'detail': serializer.data}, status=200)
        return Response({'message': 'Product not found'}, status=404)

class DeleteOrderView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'

    def get_queryset(self):
        user = User.objects.get(id=get_user(self.request))
        qs = Order.objects.filter(user=user)
        return qs

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "successfully deleted"}, status=204)

class AddReviewView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, *args,**kwargs):
        data: dict = self.request.data
        review_object = {
            'product': data.get('product'),
            'feedback': data.get('feedback'),
            'stars': int(data.get('stars')),
            'user': User.objects.get(id=get_user(self.request))
        }
        product_list = Product.objects.filter(slug=review_object.get('product'))
        print(review_object)
        if product_list.exists():
            Review.objects.create(
                product = product_list.first(),
                feedback = review_object.get('feedback'),
                stars = review_object.get('stars'),
                user = review_object.get('user')
            )
            return Response({'message': 'review added'}, status=200)
        return Response({'message': 'product not found'}, status=404)

class CheckoutSummaryView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        cart_product_list = CartProduct.objects.filter(user=User.objects.get(id=get_user(self.request)))
        if cart_product_list.exists():
            return Response({'total': sum([cp.net_price() for cp in cart_product_list])}, status=200)
        return Response({'total': 0}, status=200)