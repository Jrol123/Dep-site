from django import forms
from .models import *
 
class BookForm(forms.ModelForm):
 
    class Meta:
        model = Book
        fields = ('title', 'author', 'discipline', 'description', 'cover', 'file', )

class ReviewForm(forms.ModelForm):
 
    class Meta:
        model = Review
        fields = ('text', )

class MarkForm(forms.ModelForm):
 
    class Meta:
        model = Mark
        fields = ('mark', )
