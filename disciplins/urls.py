from django.urls import path
from . import views

urlpatterns = [  
    path('grades/', views.grades),
    path('receiving-grades/', views.receiving_grades),
    path('disciplins-for-choice/', views.disciplins_for_choice),
    path('receiving-electives/', views.receiving_electives),
]