from rest_framework import serializers
from core import models


class EnderecoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Endereco
        fields = '__all__'
