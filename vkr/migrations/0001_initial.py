# Generated by Django 4.2.7 on 2023-12-17 04:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0003_discipline_studygroup_user_study_group'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('chairman', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='committees_chaired', to=settings.AUTH_USER_MODEL)),
                ('group', models.ManyToManyField(to='users.studygroup')),
                ('members', models.ManyToManyField(related_name='committees_served', to=settings.AUTH_USER_MODEL)),
                ('secretary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='committees_secretaried', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]