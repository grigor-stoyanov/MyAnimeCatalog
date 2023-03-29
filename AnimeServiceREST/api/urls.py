from django.urls import path

from AnimeServiceREST.api.views.views import PostListCreateAPI, PostDestroyUpdate, CommentCreateGet
from AnimeServiceREST.api.views.auth.register import RegisterAPI
from AnimeServiceREST.api.views.auth.logout import LogoutAPI
from AnimeServiceREST.api.views.anime.animelist import AnimeListAPI
from AnimeServiceREST.api.views.anime.animeitem import AnimeGetAPI
from AnimeServiceREST.api.views.auth.login import LoginAPI
from AnimeServiceREST.api.views.auth.profile import ProfileGetAPI
from AnimeServiceREST.api.views.anime.animestats import LikesUpdateAPI,RatingUpdateAPI

urlpatterns = [
    path('animes/', AnimeListAPI.as_view(), name='get all animes'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('animes/<int:pk>/', AnimeGetAPI.as_view(), name='get anime'),
    path('animes/<int:pk>/posts/', PostListCreateAPI.as_view(), name='get posts'),
    path('animes/<int:pk>/posts/<str:user>/', PostDestroyUpdate.as_view(), name='alter posts'),
    path('animes/<int:pk>/like/',LikesUpdateAPI.as_view(),name='like anime'),
    path('animes/<int:pk>/rating/',RatingUpdateAPI.as_view(),name='rate anime'),
    path('profile/<str:user>/', ProfileGetAPI.as_view(), name='get profile'),
    # TODO NOT YET IMPLEMENTED
    path('animes/<int:pk>/posts/<str:user>/<int:post>/', CommentCreateGet.as_view(), name='alter posts'),
]   
