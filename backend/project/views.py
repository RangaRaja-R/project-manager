from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from api.views import user_id


@api_view(['POST'])
def create(request):
    data = request.data
    data['owner'] = user_id(request=request)
    serializer = ProjectSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def get_project(request):
    project = Project.objects.filter(id=request.query_params.get('id'), owner=user_id(request)).first()
    if not project:
        return Response({"message": "Project not found"})
    serializer = ProjectSerializer(instance=project)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_project(request):
    owner = user_id(request)
    owner_projects = Project.objects.filter(owner=owner)
    member_projects = Project.objects.filter(members__id=owner)

    # Combine both queries using the OR operator
    projects = owner_projects | member_projects

    # If you want to remove duplicate projects, you can use distinct()
    projects = projects.distinct()
    serializer = LimitedProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
def update_project(request):
    project = Project.objects.filter(id=request.data['id']).first()
    if not project:
        return Response({"message": "Project not found"})
    serializer = ProjectSerializer(instance=project, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_project(request):
    project = Project.objects.filter(id=request.query_parama.get('id')).first()
    project.delete()
    return Response({"message": "deleted successfully"})


# Task views
@api_view(['GET'])
def api_list(request):
    tasks = Task.objects.filter(owner=request.query_params.get('owner'))
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_details(request):
    task = Task.objects.filter(id=request.query_params.get('id')).first()
    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def api_create(request):
    serializer = TaskSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
def api_update(request):
    task = Task.objects.get(id=request.data['id'])
    serializer = TaskSerializer(instance=task, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_delete(request):
    task = Task.objects.get(id=request.query_params.get('id'))
    task.delete()
    return Response('deleted task')


@api_view(['PUT'])
def status(request):
    task = Task.objects.get(id=request.query_params.get('id'))
    serializer = TaskSerializer(instance=task, data={'status': request.query_params.get('status')}, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
