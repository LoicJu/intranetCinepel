# Generated by Django 3.0.6 on 2020-06-22 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intranetapp', '0007_auto_20200618_1123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendar',
            name='date',
            field=models.TextField(null=True),
        ),
    ]