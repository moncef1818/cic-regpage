from django.urls import path
from . import views

urlpatterns = [
    path('candidates/', views.candidate_list, name='candidate-list'),
    path('candidates/create/', views.candidate_create, name='candidate-create'),
    path('health/', views.helath_check, name='health-check'),
]
