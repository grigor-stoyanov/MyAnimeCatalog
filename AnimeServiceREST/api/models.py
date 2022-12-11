from django.db import models


# Create your models here.
class AnimeModel(models.Model):
    TITLE_MAX_LENGTH = 35
    title = models.CharField(max_length=TITLE_MAX_LENGTH)
    description = models.TextField()
    image = models.URLField()
