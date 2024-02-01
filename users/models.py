from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class Discipline(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class StudyGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)
    disciplines = models.ManyToManyField(to=Discipline)

    def __str__(self):
        return self.name


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users_avatars', null=True, blank=True)
    patronymic = models.CharField(max_length=100, null=True, blank=True)
    study_group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, null=True, blank=True, related_name='students')
    is_secretary = models.BooleanField(default=False)