# Generated by Django 3.0.8 on 2020-07-14 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0020_information'),
    ]

    operations = [
        migrations.AddField(
            model_name='information',
            name='title',
            field=models.CharField(default='Titre', max_length=100),
        ),
    ]
