from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from .serializers import *
from .models import *
import jwt
import datetime


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class Login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        payload = {
            'id': user.id,
            'iat': datetime.datetime.now(datetime.timezone.utc),
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60)
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")

        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"message": "login successful", "token": token}

        return response


class Logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message": "logout success"
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("unauthenticated")

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("timeout")
        user = User.objects.get(id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)
