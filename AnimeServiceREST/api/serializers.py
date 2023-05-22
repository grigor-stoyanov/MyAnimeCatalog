from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
import rest_framework.authentication

from AnimeServiceREST.api.helpers.validators import only_letters_validator, FileMaxSizeValidator
from AnimeServiceREST.api.models import AnimeModel, Profile, UsersModel, Post, Comment, GenreModel
from AnimeServiceREST.api.helpers.safe_get import get_or_none
from django.db.models import Avg

User = get_user_model()


class UserForProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_login',
                  'is_staff', 'is_superuser', 'user_tag')
        read_only_fields = ('id', 'last_login', 'is_staff',
                            'is_superuser', 'user_tag')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserForProfileSerializer()

    class Meta:
        model = Profile
        fields = '__all__'



class AnimeSerializer(ModelSerializer):
    total_likes = serializers.SerializerMethodField()
    total_dislikes = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    genres = serializers.StringRelatedField(many =True)

    class Meta:
        model = AnimeModel
        fields = '__all__'

    def get_total_likes(self, instance):
        return instance.animestats_set.filter(like=True).count()

    def get_total_dislikes(self, instance):
        return instance.animestats_set.filter(like=False).count()
    
    def get_average_rating(self,instance):
        return instance.animestats_set.all().aggregate(Avg('rating'))

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['average_rating'] = repr['average_rating']['rating__avg']
        return repr        
# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=(
        UniqueValidator(queryset=Profile.objects.all()),))
    avatar = serializers.ImageField(allow_null=True, allow_empty_file=True,
                                    validators=(FileMaxSizeValidator(Profile.AVATAR_MAX_SIZE),))

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = {"email": validated_data.pop(
            'email'), "avatar": validated_data.pop('avatar')}
        user = User.objects.create_user(
            validated_data['username'], validated_data['password'])
        Profile.objects.create(**profile_data, user=user)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        if email and password:
            user = User.objects.filter(profile__email=email).first()
            user = authenticate(request=self.context.get(
                'request'), user=user, password=password)
            attrs.update({'user': user})
            if not user:
                msg = ('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        return attrs


class CommentForPostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('content', 'user')
        model = Comment

    def to_representation(self, instance):
        representation = super(CommentForPostSerializer,
                               self).to_representation(instance)
        representation['user'] = instance.user.user.username
        return representation


class UserProfileSerializerForPost(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    user_tag = serializers.CharField(source='user.user_tag')

    class Meta:
        model = Profile
        fields = ('avatar', 'username', 'user_tag')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Post

    def to_representation(self, instance):
        representation = super(
            PostSerializer, self).to_representation(instance)
        representation['anime'] = instance.anime.title
        representation['user'] = UserProfileSerializerForPost(
            instance=instance.user).data
        comments = instance.comment_set.through.objects.filter(
            post_id=instance.pk)
        comments = [ele.comment for ele in comments]
        representation['comments'] = CommentForPostSerializer(
            comments, many=True).data
        return representation


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
