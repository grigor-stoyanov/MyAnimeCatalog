from rest_framework import generics
from rest_framework.permissions import AllowAny

from AnimeServiceREST.api.helpers.paginator import SmallResultsSetPagination
from AnimeServiceREST.api.models import AnimeModel
from AnimeServiceREST.api.serializers import AnimeSerializer
from django.db.models import Count, Q


class AnimeListAPI(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = AnimeSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = AnimeModel.objects.prefetch_related('genres')

        title = self.request.query_params.get('title')
        # convert list of year ranges to tuples with start and end date
        year_ranges =  [tuple(range_str.split('-')) for range_str in self.request.query_params.getlist('year_range')]
        # case insensitive queryparam for genres
        genres = [genre.lower() for genre in self.request.query_params.getlist('genre')]
        
        # select list of anime partialy matching the title
        if title:
            queryset = queryset.filter(title__contains=title)

        # select list of anime within year range
        if year_ranges:
            queryset = queryset.filter(
                Q(*(Q(date_begin__year__range=year_range) for year_range in year_ranges), _connector=Q.OR)
            ).distinct()

        # select list of anime matching all applied genres
        if genres:
            queryset = queryset.annotate(
                matching_genres=Count(
                    'genres', filter=Q(genres__genre__in=[genre.capitalize() for genre in genres]))
            ).filter(matching_genres=len(genres))

        return queryset
