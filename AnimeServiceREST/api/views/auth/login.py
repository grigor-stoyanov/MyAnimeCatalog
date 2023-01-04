from django.contrib.auth import login
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from AnimeServiceREST.api.serializers import LoginSerializer


class LoginAPI(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user is not None:
            if user.is_active:
                login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'pk': user.pk,
            'token': token.key,
            'tag': user.user_tag,
            'username': user.username,
        })
