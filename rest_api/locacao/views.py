from . import serializer as serializers
from core import models
from rest_framework import generics


class get_all(generics.ListAPIView):
    queryset = models.Locacao.objects.all()
    serializer_class = serializers.LocacaoSerializer


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.LocacaoSerializer


class edita(generics.UpdateAPIView):
    queryset = models.Locacao.objects.all()
    serializer_class = serializers.LocacaoSerializer


class remove(generics.DestroyAPIView):
    queryset = models.Locacao.objects.all()
    serializer_class = serializers.LocacaoSerializer
