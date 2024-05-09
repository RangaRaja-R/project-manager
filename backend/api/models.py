from django.db import models
from django.db.models import CheckConstraint
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=False)
    private = models.BooleanField(default=False)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, name='owner')
    task = models.CharField(max_length=75)
    description = models.TextField(blank=True)
    deadline = models.DateField(null=True)
    completion = models.IntegerField(default=0)

    class Meta:
        constraints = [
            CheckConstraint(
                check=models.Q(completion__gte=0)&models.Q(completion__lte=100),
                name='check_completion_level',
            ),
        ]

    def __str__(self):
        return self.task
