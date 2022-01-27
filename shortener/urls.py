from django.urls import path
from django.views.generic.edit import CreateView
from . import views
from .views import CreateView

urlpatterns = [
    path('create',CreateView.as_view(), name='create'),
    path('<str:pk>', views.go, name='go')
]
