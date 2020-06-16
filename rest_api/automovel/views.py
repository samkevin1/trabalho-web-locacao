from . import serializer as serializers
from core import models
from rest_framework import generics
from django_filters import rest_framework as filters


class ProductFilter(filters.FilterSet):
    cor = filters.CharFilter('cor')
    class Meta:
        model = models.Automovel
        fields = ['cor']


class get_all(generics.ListAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer


class consulta_automovel(generics.ListAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['cor']


class cadastra(generics.CreateAPIView):
    serializer_class = serializers.AutomovelSerializer


class edita(generics.UpdateAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer


class remove(generics.DestroyAPIView):
    queryset = models.Automovel.objects.all()
    serializer_class = serializers.AutomovelSerializer


