from rest_framework import serializers
from core import models


class LocacaoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Locacao
        fields = '__all__'
