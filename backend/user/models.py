from django.db import models
from django.contrib.auth.models import AbstractUser
from .model_manager import UserManager
<<<<<<< HEAD
=======
import uuid
>>>>>>> password-reset

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, null=False, blank=False)
<<<<<<< HEAD
=======
    reset_token = models.CharField(max_length=36, default='')
>>>>>>> password-reset

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self) -> str:
        return self.email