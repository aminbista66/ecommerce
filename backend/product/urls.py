app_name = 'product'

from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.ListProductView.as_view(), name="list"),
    path('detail/<slug:slug>/', views.DeatilProductView.as_view(), name="detail"),
    path('add-to-cart/<slug:slug>/', views.AddToCartView.as_view(), name='add-to-cart'),
    path('cart/list/', views.ListCartProductView.as_view(), name='cart-list'),
    
]