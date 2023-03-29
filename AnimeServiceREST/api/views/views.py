from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from AnimeServiceREST.api.helpers.paginator import SmallResultsSetPagination
from AnimeServiceREST.api.models import Post, Profile
from AnimeServiceREST.api.serializers import PostSerializer, \
    CommentSerializer

User = get_user_model()



class PostListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    pagination_class = SmallResultsSetPagination

    def create(self, request, *args, **kwargs):
        request.data['user'] = Profile.objects.filter(user__username=request.data['username'],user__user_tag=request.data['tag']).first().pk
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        queryset = Post.objects.select_related().filter(anime=self.kwargs['pk'])
        return queryset


# TODO Fix ability to update Posts
class PostDestroyUpdate(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def get_object(self):
        queryset = self.get_queryset()
        pk = queryset[0].pk
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        queryset = Post.objects.filter(user__user__username=self.kwargs['user'], anime=self.kwargs['pk'])
        return queryset


# TODO fix ability to create comments
class CommentCreateGet(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Post.objects.filter(anime=self.kwargs['pk'])
        return queryset

