from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()

urlpatterns = [
    path('list/', views.get_all.as_view()),
    path('create/', views.cadastra.as_view()),
    path('update/<int:pk>/', views.edita.as_view()),
    path('delete/<int:pk>/', views.remove.as_view()),
    path('consulta/', views.consulta_automovel.as_view())
]
