from django.db import models
from users.models import User, StudyGroup
from phonenumber_field.modelfields import PhoneNumberField


class Thesis(models.Model):
    title = models.CharField(max_length=255)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='thehis_have')
    supervisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='be_supervisor')
    phone = PhoneNumberField(null=False, blank=False, unique=True, region='RU')


class Commission(models.Model):
    date = models.DateField()
    time = models.TimeField()
    chairman = models.ForeignKey(User, on_delete=models.CASCADE, related_name='committees_chaired')
    members = models.ManyToManyField(User, related_name='committees_served')
    groups = models.ManyToManyField(StudyGroup)
    defender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='committions_defended', null=True,
                                 blank=True)

    class Meta:
        unique_together = (('date', 'time'),)


def get_upload_to(instance, filename):
    if isinstance(instance, StudentReport):
        return 'reports/%s/%s' % (instance.student.study_group, filename)
    elif isinstance(instance, TeachingMaterial):
        return 'materials/%s/%s' % (instance.group, filename)


class StudentReport(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reposts_created')
    report = models.FileField(upload_to=get_upload_to)

    def delete(self, *args, **kwargs):
        self.report.delete(save=False)
        super().delete(*args, **kwargs)


class TeachingMaterial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='materials_created', default=None)
    group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE)
    material = models.FileField(upload_to=get_upload_to)

    def delete(self, *args, **kwargs):
        self.material.delete(save=False)
        super().delete(*args, **kwargs)
