from django.db import models
from users.models import StudyGroup

class Graduates(models.Model):
    fio = models.CharField(max_length=255)
    date = models.DateField()
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)
    place_work = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.fio}, дата выпуска: {self.date}"