import re
from django import forms
from .models import Purchase



class PurchaseForm(forms.Form):
    class Meta:
        model = Purchase
        fields = ('quantity', 'phone', 'address')

    quantity = forms.IntegerField(min_value=1, initial=1, widget=forms.NumberInput(attrs={

    }))
    phone = forms.CharField(max_length=15, widget=forms.TextInput(attrs={
        'placeholder': '+375 XX XXXXXXX',
    }))
    address = forms.CharField(max_length=200, widget=forms.TextInput(attrs={}))