from rest_framework import serializers
from core import models
from modelo import serializer


class MarcaSerializer(serializers.ModelSerializer):

    modelos = serializer.ModeloSerializer(many=True, required=False)

    class Meta:
        model = models.Marca
        fields = ['id', 'descricao', 'modelos']
        read_only_fields = ('id',)

