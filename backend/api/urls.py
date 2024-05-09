from django.urls import path
from .views import *


urlpatterns = [
    path('', logged_in),
    path('all', all),
    path('register', register),
    path('login', login),
    path('logout', logout),
    path('delete', delete_user),
    path('task/create', api_create, name='create-todo-item'),
    path('task/list', api_list, name='todo-list'),
    path('task/details', api_details, name='todo-detail'),
    path('task/update', api_update, name='todo-update'),
    path('task/delete', api_delete, name='delete-todo-item')
]
