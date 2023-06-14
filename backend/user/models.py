from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    firstName = models.CharField(max_length=255, null=False, blank=False)
    lastName = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=False, blank=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName']

    def __str__(self) -> str:
        return self.email