from django.urls import path
from . import views

urlpatterns = [
	path('game/', views.game_state, name='game_state'),
	path('win/', views.getWinSize, name='getWinSize'),
]