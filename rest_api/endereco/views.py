from . import serializer as serializers
from core import models
from rest_framework import generics


class get_all(generics.ListAPIView):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.EnderecoSerializer


class edita(generics.UpdateAPIView):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer


class remove(generics.DestroyAPIView):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer
