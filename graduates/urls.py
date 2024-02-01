from django.urls import path
from . import views

urlpatterns = [
    path('graduates-list/', views.graduates_list),
]