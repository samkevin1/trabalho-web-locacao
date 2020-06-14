from rest_framework import serializers
from core import models


class ModeloSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Modelo
        fields = '__all__'
        read_only_fields = ('id',)
