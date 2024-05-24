from djongo import models

from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    name = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=False)
    private = models.BooleanField(default=False)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.name


class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, name='owner')
    task = models.CharField(max_length=75)
    description = models.TextField(blank=True)
    deadline = models.DateField(null=True)
    completion = models.IntegerField(default=0)


    def __str__(self):
        return self.task
