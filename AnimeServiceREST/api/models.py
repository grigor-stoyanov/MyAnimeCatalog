from django.db import models
from AnimeServiceREST.api.helpers.validators import only_letters_validator, FileMaxSizeValidator, MinDateValidator
from AnimeServiceREST.api.managers import AnimeUserManager
from django.contrib.auth import models as auth_models, get_user_model
from django.contrib.auth import base_user


class UsersModel(auth_models.PermissionsMixin, base_user.AbstractBaseUser):
    USERNAME_MAX_LENGTH = 25
    username = models.CharField(
        max_length=USERNAME_MAX_LENGTH,
        validators=(only_letters_validator,)
    )
    user_tag = models.IntegerField()
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    objects = AnimeUserManager()

    class Meta:
        unique_together = ('username', 'user_tag')

    def __str__(self):
        return f"{self.username}#{self.user_tag}"


class Profile(models.Model):
    USERNAME_MAX_LENGTH = 25
    choices = (('MALE', 'Male'), ('FEMALE', 'Female'))
    AVATAR_MAX_SIZE = 5
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True, null=True,
        validators=(FileMaxSizeValidator(AVATAR_MAX_SIZE),))
    email = models.EmailField(blank=True, null=True, unique=True)
    created = models.DateField(auto_now=True)
    birthday = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=choices)
    description = models.TextField(blank=True, null=True)

    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        primary_key=True,
        unique=True
    )

    class Meta:
        unique_together = ('email', 'user')

    def __repr__(self):
        return '<Profile %s>' % self.email

    def __str__(self):
        return self.email


class GenreModel(models.Model):
    genre = models.CharField(max_length=15)

    def __repr__(self):
        return f'{self.genre}'

    def __str__(self):
        return f'{self.genre}'


# Create your models here.
class AnimeModel(models.Model):
    TITLE_MAX_LENGTH = 35
    title = models.CharField(max_length=TITLE_MAX_LENGTH)
    image = models.URLField()
    episodes = models.IntegerField(blank=True, null=True)
    date_begin = models.DateField(blank=True, null=True)
    date_ended = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    genres = models.ManyToManyField(GenreModel)


class AnimeStats(models.Model):
    like = models.BooleanField(default=None, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True, default=0)
    user = models.ForeignKey(UsersModel, on_delete=models.CASCADE)
    anime = models.ForeignKey(AnimeModel, on_delete=models.CASCADE)


class Post(models.Model):
    content = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    anime = models.ForeignKey(AnimeModel, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('anime', 'user')

    def __repr__(self):
        return '<Post %s>' % self.content

    def __str__(self):
        return self.content


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post, blank=True)

    def __repr__(self):
        return '<Comment %s>' % self.content

    def __str__(self):
        return self.content
