from rest_framework import serializers
from core import models
from endereco import serializer


class ClienteSerializer(serializers.ModelSerializer):

    enderecos = serializer.EnderecoSerializer(many=True)

    class Meta:
        model = models.Cliente
        fields = ['id', 'enderecos', 'nome', 'sobrenome', 'cpf', 'cnh', 'telefone']
