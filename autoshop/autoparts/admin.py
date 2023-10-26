from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Product, ProductType, Manufacturer


class ProductAdmin(admin.ModelAdmin):
    list_display = ('vendor_code', 'get_image', 'name', 'product_type', 'manufacturer', 'price', 'quantity')
    list_display_links = ('vendor_code', 'name')
    search_fields = ('vendor_code', 'name', )
    list_filter = ('quantity', 'price',)
    readonly_fields = ('get_image', )

    def get_image(self, obj):
        return mark_safe(f'<img src="{obj.image.url}" width="80" height="80">')

    get_image.short_description = "Product image"


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductType)
admin.site.register(Manufacturer)
