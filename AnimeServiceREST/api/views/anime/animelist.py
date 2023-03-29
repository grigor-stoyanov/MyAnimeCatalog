from rest_framework import generics
from rest_framework.permissions import AllowAny

from AnimeServiceREST.api.helpers.paginator import SmallResultsSetPagination
from AnimeServiceREST.api.models import AnimeModel
from AnimeServiceREST.api.serializers import AnimeSerializer


class AnimeListAPI(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = AnimeModel.objects.prefetch_related('genres')
    serializer_class = AnimeSerializer
    pagination_class = SmallResultsSetPagination
