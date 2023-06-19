from .host_permission import AllowedHostPermission
from rest_framework.response import Response
from rest_framework import views
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework import generics

from django.contrib.auth import authenticate
import uuid

from .serializers import user
from .models import User


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

class LogoutView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, *args, **kwargs):
        try:
            response = Response()
            # response.delete_cookie('access_token')
            # response.delete_cookie('refresh_token')
            response.data = {
                'message': 'Logout successfull'
            }
            response.status_code = 200
            return response
        except Exception as e:
            print(e)
            return Response({'message': 'something went wrong'}, status=500)

class TokenRefreshView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, *args, **kwargs):
        token = self.request.COOKIES.get('refresh_token')

        response = Response()

        if token is not None:
            serializer = TokenRefreshSerializer(data={'refresh': token})
            serializer.is_valid(raise_exception=True)
            access_token = serializer.validated_data['access']

            response.set_cookie('access_token', str(
                access_token), httponly=True, secure=False, samesite='Lax')
            response.data = {'message': 'Token Refreshed successfully'}
            response.status_code = 200
            return response

        response.data = {'message': 'Token missing'}
        response.status_code = 404
        return response


class IssuePasswordResetView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def send_token(self, token, recipent):
        from django.template.loader import render_to_string
        from django.core.mail import send_mail
        from django.conf import settings

        email_template = render_to_string('reset_token.html', {'token': token})
        try:
            send_mail(
                'Password reset confirmation',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipent],
                message='Password reset request was issued.',
                html_message=email_template
            )
            return Response({'message': 'Please check your email'}, status=200)
        except Exception as e:
            print(e)
            return Response({'message': 'Email couldnot be sent'}, status=500)

    def post(self, *args, **kwargs):
        data: dict = self.request.data
        email = data.get('email')

        if email is not None:
            user_list = User.objects.filter(email=email)
            if user_list is None:
                return Response({'message': 'User not found'}, status=404)

            ''' Issue a reset token '''
            user: User = user_list.first()
            user.reset_token = uuid.uuid4()
            user.save()
            return self.send_token(user.reset_token, user.email)
        return Response({'message': 'email should be provided'}, status=403)


''' 
    Only client server will send request to this endpoint so AllowedHostPermission must be used.
    OR CORS settings can be changed
'''


class ResetPasswordView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def verify_token(self):
        token = self.request.GET.get('token')
        try:
            user: User = User.objects.get(reset_token=str(token))
            return user
        except Exception as e:
            print(e)
            return None

    def post(self, *args, **kwargs):
        user = self.verify_token()
        data: dict = self.request.data
        password_object = {
            'password': data.get('password'),
            'password2': data.get('password2'),
        }
        response = Response()

        if any(value is None for value in password_object.values()):
            response.data = {
                'message': 'password is not optional'
            }
            response.status_code = 403
            return response

        if user is None:
            response.data = {
                'message': 'Invalid Token'
            }
            response.status_code = 404
            return response

        user.set_password(password_object.get('password'))
        user.reset_token = ''
        user.save()

        response.data = {
            'message': 'Password successfully changed'
        }
        response.status_code = 200
        return response