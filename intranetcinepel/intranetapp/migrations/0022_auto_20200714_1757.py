# Generated by Django 3.0.8 on 2020-07-14 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0021_information_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='content',
            field=models.TextField(default=''),
        ),
    ]
