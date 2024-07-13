from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls import include

from myapp.views import index 



urlpatterns = [
    path('api/', include('myapp.urls')),
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
]

urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    # Other i18n-aware URL patterns
)

urlpatterns += [
    re_path(r'^.*$', index),
]