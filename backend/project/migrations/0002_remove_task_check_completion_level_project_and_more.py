# Generated by Django 4.1.13 on 2024-05-07 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='task',
            name='check_completion_level_project',
        ),
        migrations.RemoveField(
            model_name='task',
            name='completion',
        ),
    ]