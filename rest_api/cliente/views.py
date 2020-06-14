from . import serializer as serializers
from core import models
from rest_framework import generics


class get_all(generics.ListAPIView):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.ClienteSerializer


class edita(generics.UpdateAPIView):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer


class remove(generics.DestroyAPIView):
    queryset = models.Locacao.objects.all()
    serializer_class = serializers.ClienteSerializer
