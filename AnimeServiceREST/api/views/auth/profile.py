from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from AnimeServiceREST.api.models import Profile
from AnimeServiceREST.api.serializers import UserProfileSerializer


class ProfileGetAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, ]
    serializer_class = UserProfileSerializer
    queryset = Profile

    def get_object(self):
        try:
            username, user_tag = self.kwargs['user'].split('#')
            return self.queryset.objects.get(user__username=username, user__user_tag=user_tag)
        except (self.queryset.DoesNotExist, ValueError):
            raise Http404

    def perform_destroy(self, instance):
        instance.user.delete()
