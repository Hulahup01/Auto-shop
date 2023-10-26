from django.urls import path
from .views import ProductTypeListView, ProductDetailView

urlpatterns = [
    path('', ProductTypeListView.as_view(), name="product_list"),
    path('product/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
]
