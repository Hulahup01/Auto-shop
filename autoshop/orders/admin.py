from django.contrib import admin

from orders.models import Purchase


@admin.register(Purchase)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ('buyer', 'product', 'quantity', 'price', 'date_of_purchase')
