from .serializers.token_verify import CustomTokenVerifySerializer

def get_user(request):
    cookie: dict = request.COOKIES
    token = cookie.get('access_token')
    if token is not None and len(token) > 1:  
        data: dict= CustomTokenVerifySerializer().validate({'token': token})
        return data.get('user_id')
    return None