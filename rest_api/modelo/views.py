from . import serializer as serializers
from core import models
from rest_framework import generics


class get_all(generics.ListAPIView):
    queryset = models.Modelo.objects.all()
    serializer_class = serializers.ModeloSerializer


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.ModeloSerializer


class edita(generics.UpdateAPIView):
    serializer_class = serializers.ModeloSerializer


class remove(generics.DestroyAPIView):
    serializer_class = serializers.ModeloSerializer
