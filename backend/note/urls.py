from django.urls import path
from .views import *

urlpatterns = [
    path('', get_note),
    path('update', edit_note)
]
