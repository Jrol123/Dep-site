from django.db import models
from users.models import User, StudyGroup
from django.core.validators import MinValueValidator, MaxValueValidator

class Subjects(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} / тип: {self.type}"

class Grades(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    term = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(8)])
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    grade = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    date = models.DateField()
    fio_teacher = models.CharField(max_length=255)

    def __str__(self):
        return f"пользователь: {self.user} / предмет: {self.subject} / оценка: {self.grade} / дата сдачи: {self.date}"
    

class Electives(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"
    
class GroupElectives(models.Model):
    electives = models.ManyToManyField(Electives)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)

    def __str__(self):
        return f"Факультативы для {self.group}"
    
class ReceivingElectives(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    electives = models.ManyToManyField(Electives)

    def __str__(self):
        return f"Факультативы выбранные {self.user.username}"