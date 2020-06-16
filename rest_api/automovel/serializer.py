from rest_framework import serializers
from core import models
from locacao import serializer


class AutomovelSerializer(serializers.ModelSerializer):

    locacoes = serializer.LocacaoSerializer(many=True, required=False)

    class Meta:
        model = models.Automovel
        fields = ['id', 'locacoes', 'placa', 'renavam', 'chassi',
                  'valor_locacao', 'cor', 'tipo_combustivel', 'modelo']
