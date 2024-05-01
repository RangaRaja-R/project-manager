from django.db import models


class Note(models.Model):
    mail = models.EmailField(blank=False, unique=True, primary_key=True)
    content = models.TextField(blank=True, null=True)
