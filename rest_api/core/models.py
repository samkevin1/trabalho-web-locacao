from datetime import datetime

from django.db import models


class Marca(models.Model):
    descricao = models.CharField(max_length=45)


class Modelo(models.Model):
    descricao = models.CharField(max_length=45)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)


class Automovel(models.Model):
    placa = models.CharField(max_length=15)
    renavam = models.CharField(max_length=45)
    cor = models.CharField(max_length=45)
    chassi = models.CharField(max_length=45)
    tipo_combustivel = models.CharField(max_length=45)
    valor_locacao = models.FloatField()
    modelo = models.ForeignKey(Modelo, on_delete=models.CASCADE)


class Cliente(models.Model):
    nome = models.CharField(max_length=45)
    sobrenome = models.CharField(max_length=45)
    cpf = models.CharField(max_length=14)
    cnh = models.CharField(max_length=45)
    telefone = models.CharField(max_length=45)


class Endereco(models.Model):
    cep = models.IntegerField()
    logradouro = models.CharField(max_length=45)
    numero = models.IntegerField()
    bairro = models.CharField(max_length=45)
    cidade = models.CharField(max_length=45)
    pais = models.CharField(max_length=45)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)


class Locacao(models.Model):
    dt_locacao = models.DateTimeField(default=datetime.now())
    dt_devolucao = models.DateTimeField(blank=True, null=True)
    km = models.IntegerField()
    valor_calcao = models.FloatField()
    valor_km = models.FloatField()
    devolucao = models.IntegerField()
    bonus = models.IntegerField()
    valor_total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    automovel = models.ForeignKey(Automovel, on_delete=models.CASCADE)
