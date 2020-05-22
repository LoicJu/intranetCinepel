# Generated by Django 3.0.6 on 2020-05-22 08:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Intranet_User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('username', models.CharField(max_length=150)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('permission', models.CharField(default='placeur', max_length=50)),
                ('is_manager', models.BooleanField(default=False)),
                ('city', models.CharField(default='Neuchatel', max_length=50)),
                ('infos', models.CharField(default='nothing', max_length=150)),
                ('holidays', models.CharField(default='nothing', max_length=150)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='template', max_length=50)),
                ('content', models.CharField(max_length=500)),
                ('id_create', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.CharField(default='mois', max_length=50)),
                ('specific_content', models.CharField(max_length=500)),
                ('id_Template', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='intranetapp.Template')),
            ],
        ),
    ]