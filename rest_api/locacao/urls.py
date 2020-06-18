from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.get_all.as_view()),
    path('create/', views.registraLocacao.as_view()),
    path('update/<int:pk>/', views.edita.as_view()),
    path('delete/<int:pk>/', views.remove.as_view())
]
