from rest_framework import generics

from AnimeServiceREST.api.helpers.paginator import SmallResultsSetPagination
from AnimeServiceREST.api.models import AnimeModel
from AnimeServiceREST.api.serializers import AnimeSerializer


class AnimeListApiView(generics.ListAPIView):
    queryset = AnimeModel.objects.all()
    serializer_class = AnimeSerializer
    pagination_class = SmallResultsSetPagination
