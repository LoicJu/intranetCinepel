# Generated by Django 3.0.6 on 2020-06-16 08:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0004_auto_20200615_1256'),
    ]

    operations = [
        migrations.AddField(
            model_name='calendar',
            name='id_creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
