from django.urls import path

from AnimeServiceREST.api.views import AnimeListApiView, RegisterAPI, LoginAPI, LogoutAPI

urlpatterns = [
    path('animes/', AnimeListApiView.as_view(), name='get all animes'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),

]
