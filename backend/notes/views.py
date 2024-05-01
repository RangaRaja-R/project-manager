from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer


@api_view(['GET'])
def get_note(request):
    try:
        note = Note.objects.get(mail=request.data['mail'])
    except Note.DoesNotExist:
        note = Note()
        note.mail = request.data['mail']
        note.content = ''
    except KeyError:
        return Response({"message": "please provide the email"})

    serializer = NoteSerializer(instance=note, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'PUT'])
def edit_note(request):
    note = Note.objects.get(mail=request.data['mail'])
    serializer = NoteSerializer(instance=note, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
