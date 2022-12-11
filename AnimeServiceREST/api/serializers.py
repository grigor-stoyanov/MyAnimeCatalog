from rest_framework.serializers import ModelSerializer

from AnimeServiceREST.api.models import AnimeModel


class AnimeSerializer(ModelSerializer):
    class Meta:
        model = AnimeModel
        fields = '__all__'
