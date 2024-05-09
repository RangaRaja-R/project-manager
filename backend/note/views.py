from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from api.models import User


@api_view(['GET'])
def get_note(request):
    owner = request.query_params.get('owner')
    note = Note.objects.filter(owner=owner).first()
    if not note:
        note = Note.objects.create(owner=User.objects.get(id=owner), content='')
    serializer = NoteSerializer(instance=note)
    return Response(serializer.data)


@api_view(['POST', 'PUT'])
def edit_note(request):
    note = Note.objects.filter(owner=request.data['owner']).first()
    serializer = NoteSerializer(instance=note, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
