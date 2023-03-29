from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from AnimeServiceREST.api.models import AnimeModel
from AnimeServiceREST.api.serializers import AnimeSerializer

User = get_user_model()

class AnimeGetAPI(generics.RetrieveUpdateAPIView):
    permission_classes =[AllowAny,]
    serializer_class = AnimeSerializer
    queryset = AnimeModel.objects.select_related()

    