from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .game import Game

def test(request):
    return HttpResponse("Backend is working!")

def home(request):
    return HttpResponse("Welcome to the homepage!")

@api_view(['GET'])
# def game_status(request):
#     data = {
#         "ball_position": [100, 200],
#         "player1_position": [50, 200],
#         "player2_position": [450, 200],
#         "score": {"player1": 5, "player2": 3},
#     }
#     return Response(data)
def game_state(request):
    Game.ball_move(Game.ball)
    Game.ball_wall_collision(Game.ball)
    Game.ball_paddle_collision(Game.ball, Game.left_paddle, Game.right_paddle)
    Game.paddleMovements(request)
    return JsonResponse({
        'ball': {'x': Game.ball.x, 'y': Game.ball.y, 'radius': Game.ball.radius},
        'left_paddle': {'x': Game.left_paddle.x, 'y': Game.left_paddle.y, 'width': Game.left_paddle.width, 'height': Game.left_paddle.height},
        'right_paddle': {'x': Game.right_paddle.x, 'y': Game.right_paddle.y, 'width': Game.right_paddle.width, 'height': Game.right_paddle.height},
        'score': Game.score
    })