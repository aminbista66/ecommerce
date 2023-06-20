app_name = 'product'

from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.ListProductView.as_view()),
    path('detail/<slug:slug>/', views.DeatilProductView.as_view()),
    path('add-to-cart/<slug:slug>/', views.AddToCartView.as_view()),
    path('cart/list/', views.ListCartProductView.as_view()),
    path('', views.SearchProductView.as_view()),
    path('cart/delete/<slug:slug>/', views.DeleteCartProductView.as_view()),
    path('cart/decrease-quantity/<slug:slug>/', views.DecreaseQuantityView.as_view()),
    path('cart/increase-quantity/<slug:slug>/', views.IncreaseQuantityView.as_view()),
    path('order/<slug:slug>/', views.CreateOrderView.as_view()),
    path('order-delete/<slug:slug>/', views.DeleteOrderView.as_view()),
    path('add-review/', views.AddReviewView.as_view()),
    
]