from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *
import jwt
import datetime
import environ

env = environ.Env()
SECRET_KEY = env('SECRET_KEY')

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'user': serializer.data, 'message': 'success'})
    else:
        return Response({'message': "user already exists"})


@api_view(['POST'])
def login(request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email).first()

    if user is None:
        return Response({'message': 'user not found'})

    if not user.check_password(password):
        return Response({'message': 'incorrect password'})
    now = datetime.datetime.now(datetime.timezone.utc)
    exp = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=10)
    duration = exp - now
    max_age = int(duration.total_seconds())
    payload = {
        'id': user.id,
        'iat': now,
        'exp': exp
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    response = Response()
    response.set_cookie(key="jwt", value=token, httponly=True, samesite='None', secure=True,max_age=max_age)
    response.set_cookie(key="user", value="hello there", httponly=False, secure=True, samesite='None', max_age=max_age)
    response.data = {"message": "success"}

    return response


@api_view(['POST'])
def logout(request):
    response = Response()
    response.delete_cookie("jwt")
    response.delete_cookie("user")
    response.data = {
        "message": "success"
    }
    return response


@api_view(['DELETE'])
def delete_user(request):
    token = request.COOKIES.get('jwt')
    if not token:
        return Response({'message': 'please login'})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return Response({'message': 'login time out'})
    user = User.objects.get(id=payload['id'])
    if not user:
        return Response({"message": "User Not Found"})
    user.delete()
    return Response({"message": "success"})


@api_view(['GET'])
def logged_in(request):
    token = request.COOKIES.get('jwt')
    if not token:
        return Response({'message': 'please login'})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return Response({'message': 'login timed out'})

    user = User.objects.get(id=payload['id'])
    serializer = UserSerializer(user)
    return Response({'user': serializer.data, 'message': 'success'})


@api_view(['GET'])
def all(request):
    users = User.objects.filter(private=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# Task Views
@api_view(['GET'])
def api_list(request):
    try:
        tasks = Task.objects.filter(owner=request.query_params.get('owner'))
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    except KeyError:
        return Response({'message': 'please send the user id as owner'})


@api_view(['GET'])
def api_details(request):
    task = Task.objects.filter(id=request.query_params.get('id')).first()
    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def api_create(request):
    serializer = TaskSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
def api_update(request):
    task = Task.objects.get(id=request.data['id'])
    serializer = TaskSerializer(instance=task, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_delete(request):
    task = Task.objects.get(id=request.query_params.get('id'))
    task.delete()
    return Response('deleted task')