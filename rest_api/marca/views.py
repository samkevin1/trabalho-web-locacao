from . import serializer as serializers
from core import models
from rest_framework import generics


class get_all(generics.ListAPIView):
    queryset = models.Marca.objects.all()
    serializer_class = serializers.MarcaSerializer


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.MarcaSerializer


class edita(generics.UpdateAPIView):
    queryset = models.Marca.objects.all()
    serializer_class = serializers.MarcaSerializer


class remove(generics.DestroyAPIView):
    queryset = models.Marca.objects.all()
    serializer_class = serializers.MarcaSerializer
