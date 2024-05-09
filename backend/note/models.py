from django.db import models
from api.models import User


class Note(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    content = models.TextField(blank=True, default='')
