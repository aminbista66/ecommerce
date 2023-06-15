from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate


class LoginView(APIView):
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
