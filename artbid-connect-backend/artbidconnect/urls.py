"""
URL configuration for artbidconnect project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import  TemplateView
from gallery.views import ReactAppView

# import debug_toolbar

admin.site.site_header = 'ARTBID CONNECT'
admin.site.index_title = 'Admin'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    
   
    path('login/', ReactAppView.as_view(), name='react-app-login'),
    path('register/', ReactAppView.as_view(), name='react-app-register'),
    path('home/', ReactAppView.as_view(), name='react-app-home'),
    path('about/', ReactAppView.as_view(), name='react-app-about'),
    path('profile/', ReactAppView.as_view(), name='react-app-profile'),
    path('artist-onboard/', ReactAppView.as_view(), name='react-app-artist-onboard'),
    path('api/', include('gallery.urls')),
     path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]