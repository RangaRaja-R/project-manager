from django.urls import path
from .views import *

urlpatterns = [
    path('create', create),
    path('update', update_project),
    path('delete', delete_project),
    path('get', get_project),
    path('get-owned', get_all_project),
    path('task/create', api_create, name='create-todo-item'),
    path('task/list', api_list, name='todo-list'),
    path('task/details', api_details, name='todo-detail'),
    path('task/update', api_update, name='todo-update'),
    path('task/delete', api_delete, name='delete-todo-item'),
    path('task/status', status)
]