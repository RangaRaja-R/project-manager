# Generated by Django 4.1.13 on 2024-05-22 10:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=75)),
                ('description', models.TextField(blank=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('due', models.DateField(null=True)),
                ('group', models.BooleanField(default=False)),
                ('members', models.ManyToManyField(blank=True, related_name='group_members', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=75)),
                ('description', models.TextField(blank=True)),
                ('deadline', models.DateField(null=True)),
                ('status', models.CharField(choices=[('To Do', 'To Do'), ('In Progress', 'In Progress'), ('Completed', 'Completed')], default='To Do', max_length=25)),
                ('priority', models.CharField(choices=[('high', 'high'), ('medium', 'medium'), ('low', 'low')], default='default', max_length=25)),
                ('difficulty', models.CharField(choices=[('high', 'high'), ('medium', 'medium'), ('low', 'low')], default='default', max_length=25)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_to', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='belongs_to_project', to='project.project')),
            ],
        ),
    ]
