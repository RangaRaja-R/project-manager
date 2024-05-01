from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
