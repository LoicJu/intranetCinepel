# Generated by Django 3.0.8 on 2020-07-17 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0025_auto_20200717_0950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='timestamp',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
