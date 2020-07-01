# Generated by Django 3.0.6 on 2020-06-18 11:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0005_calendar_id_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='id_creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='specific_content',
            field=jsonfield.fields.JSONField(default=dict),
        ),
    ]
