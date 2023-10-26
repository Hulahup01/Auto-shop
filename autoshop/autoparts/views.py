from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic

from .models import ProductType, Product


class ProductDetailView(generic.DetailView):
    model = Product
    template_name = 'autoparts/product_detail.html'
    context_object_name = 'product'
    slug_field = 'vendor_code'
    slug_url_kwarg = 'slug'


class ProductTypeListView(generic.ListView):
    model = ProductType
    template_name = 'autoparts/product_list.html'
    context_object_name = 'product_types'
