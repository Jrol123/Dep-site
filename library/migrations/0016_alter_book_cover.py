# Generated by Django 4.2.7 on 2023-12-09 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0015_alter_book_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='cover',
            field=models.ImageField(blank=True, height_field='410', null=True, upload_to='covers/', width_field='258'),
        ),
    ]
