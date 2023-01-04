from django.contrib import admin

from AnimeServiceREST.api.models import AnimeModel, GenreModel



@admin.register(AnimeModel)
class AnimeAdmin(admin.ModelAdmin):
    pass

@admin.register(GenreModel)
class GenreAdmin(admin.ModelAdmin):
    pass