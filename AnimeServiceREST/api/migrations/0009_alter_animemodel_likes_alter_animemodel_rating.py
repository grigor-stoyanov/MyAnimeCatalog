# Generated by Django 4.1.6 on 2023-03-28 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_animemodel_likes_animemodel_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animemodel',
            name='likes',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='animemodel',
            name='rating',
            field=models.JSONField(default=list),
        ),
    ]
