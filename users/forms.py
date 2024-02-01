from django import forms
from django.contrib.auth.forms import (AuthenticationForm, UserChangeForm,
                                       UserCreationForm)
from .models import *

class UserLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ('username', 'password')



class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'patronymic', 'avatar', 'username', 'email', 'password1', 'password2')

    def save(self, commit=True):
        user = super(UserRegistrationForm, self).save(commit=True)
        # send_email_verification.delay(user.id)
        return user
