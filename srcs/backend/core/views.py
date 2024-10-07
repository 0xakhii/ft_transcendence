from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from core.models import init
from core.models import canvasHeight
from core.models import canvasWidth
import json

def test(request):
    print("Test endpoint hit")
    return HttpResponse("Backend is working!")

def home(request):
    return HttpResponse("Welcome to the homepage!")

# def game_status(request):
#     data = {
#         "ball_position": [100, 200],
#         "player1_position": [50, 200],
#         "player2_position": [450, 200],
#         "score": {"player1": 5, "player2": 3},
#     }
#     return Response(data)
@api_view(['GET'])
def game_state(request):
    game = init()
    # game.ball_move(game.ball)
    # game.ball_wall_collision(game.ball)
    # game.ball_paddle_collision(game.ball, game.left_paddle, game.right_paddle)
    # game.paddleMovements(request)
    return JsonResponse({
        'ball': {'x': game.ball.x, 'y': game.ball.y, 'radius': game.ball.radius},
        'left_paddle': {'x': game.left_paddle.x, 'y': game.left_paddle.y, 'width': game.left_paddle.width, 'height': game.left_paddle.height},
        'right_paddle': {'x': game.right_paddle.x, 'y': game.right_paddle.y, 'width': game.right_paddle.width, 'height': game.right_paddle.height},
        'score': game.score
    })
@api_view(['POST'])
def getWinSize(request):
    data = json.loads(request.body)
    canvasWidth = data.get('canvasWidth')
    canvasHeight = data.get('canvasHeight')
    return JsonResponse({
        'canvasWidth': canvasWidth,
        'canvasHeight': canvasHeight
    })