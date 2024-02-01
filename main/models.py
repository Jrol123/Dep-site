from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()

    def __str__(self):
        return f"{self.title}, дата публикации: {self.date}"