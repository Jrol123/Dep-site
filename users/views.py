from django.shortcuts import render, redirect
from django.contrib import auth
from django.urls import reverse
from .forms import *


def sign_up(request):
    if request.method == 'POST':
        form = UserRegistrationForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('/users/sign_in/')
    else:
        form = UserRegistrationForm()
    return render(request, 'users/sign_up.html', {
        'form': form,
    })


def sign_in(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return redirect('/')
    else:
        form = UserLoginForm()
    return render(request, 'users/sign_in.html', {
        'form': UserLoginForm(),
    })


def sign_out(request):
    auth.logout(request)
    return redirect(request.META.get('HTTP_REFERER'))
