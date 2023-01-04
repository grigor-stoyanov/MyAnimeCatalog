from django.contrib.auth import login
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from AnimeServiceREST.api.serializers import RegisterSerializer


class RegisterAPI(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    parser_classes = [FormParser, MultiPartParser, FileUploadParser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        if user is not None:
            if user.is_active:
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return Response({
            'pk': user.pk,
            'token': token.key,
            'tag': user.user_tag,
            'username': user.username,
        })
