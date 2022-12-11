from django.urls import path

from AnimeServiceREST.api.views import AnimeListApiView

urlpatterns = [
    path('animes/', AnimeListApiView.as_view(), name='get all animes')
]
