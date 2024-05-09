from django.db import models
from django.db.models import CheckConstraint
from api.models import User


class Project(models.Model):
    title = models.CharField(max_length=75, blank=False)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    due = models.DateField(null=True)
    group = models.BooleanField(default=False)
    members = models.ManyToManyField(User, related_name='group_members', blank=True)


class Task(models.Model):
    ch = [
        ("high", "high"),
        ("medium", "medium"),
        ("low", "low")
    ]
    st = [
        ("To Do", "To Do"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed")
    ]
    owner = models.ForeignKey(Project, on_delete=models.CASCADE, name='owner', related_name='belongs_to_project')
    title = models.CharField(max_length=75)
    description = models.TextField(blank=True)
    deadline = models.DateField(null=True)
    status = models.CharField(max_length=25, default='To Do', choices=st)
    priority = models.CharField(max_length=25, default='default', choices=ch)
    difficulty = models.CharField(max_length=25, default='default', choices=ch)
    # if group project
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="assigned_to")

    def __str__(self):
        return self.title
