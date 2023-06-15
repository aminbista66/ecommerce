from django.db import models
from django.contrib.auth.models import AbstractUser
from .model_manager import UserManager

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, null=False, blank=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self) -> str:
        return self.email