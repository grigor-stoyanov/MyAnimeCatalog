from django.contrib.auth import get_user_model, login
from rest_framework import generics, status
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from AnimeServiceREST.api.helpers.paginator import SmallResultsSetPagination
from AnimeServiceREST.api.models import AnimeModel
from AnimeServiceREST.api.serializers import AnimeSerializer, RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token

User = get_user_model()


class AnimeListApiView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = AnimeModel.objects.all()
    serializer_class = AnimeSerializer
    pagination_class = SmallResultsSetPagination


class RegisterAPI(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    parser_classes = [FormParser, MultiPartParser, FileUploadParser]

    def post(self, request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        if user is not None:
            if user.is_active:
                login(request, user)
        return Response({
            'token': token.key,
            'user': user.username,
        })


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
            'token': token.key,
            'user': user.username,
        })


class LogoutAPI(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
