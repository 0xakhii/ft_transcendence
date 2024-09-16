from django.urls import path
from . import views
from . import __init__

urlpatterns = [
    # path('', views.home, name='home'),
	path('', views.game_state, name='pong'),
]
