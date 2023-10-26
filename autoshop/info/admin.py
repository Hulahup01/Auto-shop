from django.contrib import admin
from django.utils.safestring import mark_safe

from info.models import News


class NewsAdmin(admin.ModelAdmin):
    list_display = ('get_image', 'title', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title',)
    list_filter = ('created_at',)
    readonly_fields = ('get_image', )

    def get_image(self, obj):
        return mark_safe(f'<img src="{obj.image.url}" width="80" height="80">')

    get_image.short_description = "News image"


admin.site.register(News, NewsAdmin)
