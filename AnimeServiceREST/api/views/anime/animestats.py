from rest_framework import generics, serializers
from AnimeServiceREST.api.models import AnimeStats
from rest_framework.permissions import AllowAny, IsAuthenticated
from AnimeServiceREST.api.helpers.put_as_create_mixin import AllowPUTAsCreateMixin
from rest_framework.generics import get_object_or_404
from django.http import Http404, JsonResponse


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeStats
        exclude = ('rating',)


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeStats
        exclude = ('like',)


class LikesUpdateAPI(AllowPUTAsCreateMixin, generics.RetrieveUpdateAPIView):
    serializer_class = LikeSerializer
    queryset = AnimeStats.objects.all()
    permission_classes = [IsAuthenticated,]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset, user__pk=self.request.auth.user.pk, anime__id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Http404:
            return JsonResponse({}, status=204)


class RatingUpdateAPI(AllowPUTAsCreateMixin, generics.RetrieveUpdateAPIView):
    serializer_class = RatingSerializer
    queryset = AnimeStats.objects.select_related()
    permission_classes = [AllowAny,]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset, user__pk=self.request.auth.user.pk, anime__id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Http404:
            return JsonResponse({}, status=204)