"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('order_by_<str:order_by>', views.order_by),
    path('book/<int:pk>/', views.book_info),
    path('book/<int:pk>/reviews/', views.render_reviews),
    path('book/<int:pk>/put-stars/', views.book_info),
    path('book/<int:pk>/write-review/', views.book_info),
    path('post-book/', views.post_book_view),
    path('', views.library),
]
