from django.conf import settings
from django.db import models
from django.utils import timezone
from users.models import User


# from django.contrib.auth.models import User

class Discipline(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE)
    description = models.CharField(max_length=800)
    cover = models.ImageField(upload_to='covers/', null=True, blank=True)
    file = models.FileField(upload_to='books/', null=True, blank=True)
    average_rating = models.DecimalField(decimal_places=2, max_digits=3, default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title + ' ' + self.author


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey("Book", on_delete=models.CASCADE, null=True, related_name='reviews')
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    # def publish(self):
    #     self.published_date = timezone.now()
    #     self.save()

    def __str__(self):
        return self.author.username + '   ' + self.text


class Mark(models.Model):
    # Mark_choice=[
    #     (1, 'Ужасно'),
    #     (2, 'Плохо'),
    #     (3, 'Нормально'),
    #     (4, 'Хорошо'),
    #     (5, 'Отлично')
    # ]
    book = models.ForeignKey("Book", on_delete=models.CASCADE, null=True, related_name='marks')
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    mark = models.IntegerField(default=0)

    def __str__(self):
        return self.author.username + ' ' + str(self.mark) + ' ' + self.book.title
