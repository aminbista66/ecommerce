from rest_framework.response import Response
from rest_framework import views
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework import generics

from django.contrib.auth import authenticate

from .serializers import user

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = user.UserCreateSerializer

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, *args, **kwargs):
        response = Response()
        data: dict = self.request.data
        user_object = {
            'email': data.get('email'),
            'password': data.get('password'),
        }

        if any(value is None for value in user_object.values()):
            response.data = {
                'message': 'email or password is not optional'
            }
            response.status_code = 403
            return response

        user = authenticate(self.request, **user_object)
        if user is not None:
            if user.is_active:
                raw_token = RefreshToken.for_user(user)
                response.set_cookie("access_token", str(
                    raw_token.access_token), httponly=True, secure=False, samesite="Lax")
                response.set_cookie("refresh_token", str(
                    raw_token), httponly=True, secure=False, samesite="Lax")

                response_data = {
                    **user_object,
                }

                response.data = {
                    "message": "Auth Cookie Set", "data": response_data,
                }
                return response
        response.data = {
            'message': 'email or password incorrect'
        }
        response.status_code = 403
        return response


class TokenRefreshView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, *args, **kwargs):
        token = self.request.COOKIES.get('refresh_token')

        response = Response()

        if token is not None:
            serializer = TokenRefreshSerializer(data={'refresh': token})
            serializer.is_valid(raise_exception=True)
            access_token = serializer.validated_data['access']

            response.set_cookie('access_token', str(access_token), httponly=True, secure=False, samesite='Lax')
            response.data = {'message': 'Token Refreshed successfully'}
            response.status_code = 200
            return response

        response.data = {'message': 'Token missing'}
        response.status_code = 404
        return response