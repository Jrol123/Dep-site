from django.urls import path
from . import views

urlpatterns = [
    path('', views.booking),
    path('date-selection/', views.date_selection, name='date_selection'),
    path('booking-audience/', views.booking_audience),
]