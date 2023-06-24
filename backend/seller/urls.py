app_name = "seller"

from django.urls import path
from seller import views

urlpatterns = [
    path('', views.index, name='index'),
    path('inventory/', views.Inventory.as_view(), name='inventory')
]