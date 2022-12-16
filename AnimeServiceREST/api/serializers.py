from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from AnimeServiceREST.api.helpers.validators import only_letters_validator, FileMaxSizeValidator
from AnimeServiceREST.api.models import AnimeModel, Profile, UsersModel

User = get_user_model()


class AnimeSerializer(ModelSerializer):
    class Meta:
        model = AnimeModel
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('user',)


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=(UniqueValidator(queryset=Profile.objects.all()),))
    avatar = serializers.ImageField(allow_null=True, allow_empty_file=True,
                                    validators=(FileMaxSizeValidator(Profile.AVATAR_MAX_SIZE),))

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            profile_data = {"email": validated_data.pop('email'), "avatar": validated_data.pop('avatar')}
            user = User.objects.create_user(validated_data['username'], validated_data['password'])
            Profile.objects.create(**profile_data, user=user)
            return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=UsersModel.USERNAME_MAX_LENGTH, validators=(only_letters_validator,))
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            attrs['user'] = user
            if not user:
                msg = ('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
            else:
                msg = ('Must include "username" and "password".')
                raise serializers.ValidationError(msg, code='authorization')
        return attrs
