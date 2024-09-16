from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from . import __init__

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
    __init__.ball_move(__init__.ball)
    __init__.ball_wall_collision(__init__.ball)
    __init__.ball_paddle_collision(__init__.ball, __init__.left_paddle, __init__.right_paddle)
    __init__.paddleMovements(request)
    return JsonResponse({
        'ball': {'x': __init__.ball.x, 'y': __init__.ball.y, 'radius': __init__.ball.radius},
        'left_paddle': {'x': __init__.left_paddle.x, 'y': __init__.left_paddle.y, 'width': __init__.left_paddle.width, 'height': __init__.left_paddle.height},
        'right_paddle': {'x': __init__.right_paddle.x, 'y': __init__.right_paddle.y, 'width': __init__.right_paddle.width, 'height': __init__.right_paddle.height},
        'score': __init__.score
    })