# Generated by Django 4.2.7 on 2023-12-10 12:05

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_num', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('time', models.CharField(choices=[('08:30 - 10:00', '08:30 - 10:00'), ('10:10 - 11:40', '10:10 - 11:40'), ('11:50 - 13:20', '11:50 - 13:20'), ('13:30 - 15:00', '13:30 - 15:00'), ('15:10 - 16:40', '15:10 - 16:40'), ('16:50 - 18:20', '16:50 - 18:20')], max_length=20)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='booking.room')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('room', 'date', 'time')},
            },
        ),
    ]
