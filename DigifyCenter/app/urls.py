from django.contrib import admin
from django.urls import path, include
from . import views



app_name = 'app'
urlpatterns = [
    
    path('get_details',views.GetDetails,name='get_details'),
    path('',views.index,name='index'),

    
]