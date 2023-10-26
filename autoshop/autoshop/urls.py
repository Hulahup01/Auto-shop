from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from autoshop import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('autoparts/', include('autoparts.urls')),
    path('', include('info.urls')),
    path('account/', include('authorization.urls')),
    path('purchase/', include('orders.urls')),
    path('reviews/', include('reviews.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)