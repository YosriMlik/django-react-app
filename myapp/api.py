from myapp.models import ToDo
from rest_framework import viewsets, permissions
from .serializers import ToDoSerializer

class TodoViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
