import datetime as dt

# from django.contrib.auth.models import User
from users.models import User
from django.db import models

# Create your models here.
# 952/953


TIME_SLOTS = [
    '08:30 - 10:00',
    '10:10 - 11:40',
    '11:50 - 13:20',
    '13:30 - 15:00',
    '15:10 - 16:40',
    '16:50 - 18:20',
    '18:30 - 20:00',
    '20:10 - 21:40'
]


class Room(models.Model):
    room_num = models.IntegerField(unique=True)


class Booking(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateField(default=dt.date.today)
    time = models.CharField(choices=[(ts, ts) for ts in TIME_SLOTS], max_length=20)

    class Meta:
        unique_together = ('room', 'date', 'time')
