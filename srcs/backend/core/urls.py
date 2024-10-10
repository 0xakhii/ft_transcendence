from django.urls import path
from . import views, const

urlpatterns = [
	path('win/', const.getWinSize, name='getWinSize'),
	path('game/', views.game_state, name='game_state'),
]