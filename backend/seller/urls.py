app_name = "seller"

from django.urls import path
from seller import views
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView

from django.contrib.auth.forms import UserCreationForm
from user.models import User

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2', 'is_seller']

class Register(CreateView):
    model = User
    form_class = RegisterForm
    template_name = 'seller/register.html'
    success_url = '/login/'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', LoginView.as_view(template_name="seller/login.html"), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', Register.as_view(), name='register'),
    path('inventory/', views.Inventory.as_view(), name='inventory')
]