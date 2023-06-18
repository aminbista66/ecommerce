app_name = 'user'

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('refresh/', views.TokenRefreshView.as_view(), name='refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('reset/issue/', views.IssuePasswordResetView.as_view(), name='password_reset'),
    path('reset/', views.ResetPasswordView.as_view(), name='password_change'),
]