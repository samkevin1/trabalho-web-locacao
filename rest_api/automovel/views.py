from . import serializer as serializers
from core import models
from rest_framework import generics
from django_filters import rest_framework as filters


class get_all(generics.ListAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer


class consulta_automovel(generics.ListAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = 'cor'


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.AutomovelSerializer


class edita(generics.UpdateAPIView):
    serializer_class = serializers.AutomovelSerializer


class remove(generics.DestroyAPIView):
    serializer_class = serializers.AutomovelSerializer


