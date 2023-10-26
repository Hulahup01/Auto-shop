from django.urls import path

from orders.views import purchase, purchase_success

urlpatterns = [
    path('PP<str:vendor_code>/', purchase, name='purchase'),
    path('PP/success/', purchase_success, name='purchase_success')
]
