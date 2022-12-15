import datetime as dt
from django.db import models
from django.core import validators
from AnimeServiceREST.api.helpers.validators import only_letters_validator, FileMaxSizeValidator, MinDateValidator
from AnimeServiceREST.api.managers import AnimeUserManager
from django.contrib.auth import models as auth_models, get_user_model
from django.contrib.auth import base_user


# Create your models here.
class AnimeModel(models.Model):
    TITLE_MAX_LENGTH = 35
    title = models.CharField(max_length=TITLE_MAX_LENGTH)
    description = models.TextField()
    image = models.URLField()


class UsersModel(auth_models.PermissionsMixin, base_user.AbstractBaseUser):
    USERNAME_MAX_LENGTH = 25
    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        unique=True,
        validators=(only_letters_validator,)
    )
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'

    objects = AnimeUserManager()


class Profile(models.Model):
    AVATAR_MAX_SIZE = 5
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True, null=True,
        validators=(FileMaxSizeValidator(AVATAR_MAX_SIZE),))

    email = models.EmailField(blank=True, null=True, unique=True)

    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        primary_key=True
    )

    class Meta:
        unique_together = ('email', 'user')