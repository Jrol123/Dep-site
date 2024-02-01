from django.shortcuts import render
from .models import *

def graduates_list(request):
    graduates = Graduates.objects.all().order_by('-date')
    return render(request, 'graduates/graduates_list.html', {
        'graduates': graduates,
    })
