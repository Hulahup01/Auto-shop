from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils.datetime_safe import datetime

from autoparts.models import Product
from orders.forms import PurchaseForm
from orders.models import Purchase


@login_required(login_url='signin')
def purchase_success(request):
    return render(request, 'orders/purchase_success.html')


@login_required(login_url='signin')
def purchase(request, vendor_code):
    prod = Product.objects.get(vendor_code=vendor_code)

    if prod.quantity == 0:
        return redirect('/')

    if request.method == 'POST':
        form = PurchaseForm(request.POST)
        if form.is_valid():
            purchase_data = form.cleaned_data
            purchased = Purchase(buyer=request.user, quantity=purchase_data['quantity'],
                                product=prod, price=purchase_data['quantity'] * prod.price,
                                date_of_purchase=datetime.now())
            purchased.save()
            prod.quantity -= purchase_data['quantity']
            prod.save()
            return redirect('purchase_success')
    else:
        form = PurchaseForm()

    context = {'prod': prod, 'form': form}
    return render(request, 'orders/purchase.html', context)
