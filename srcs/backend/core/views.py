from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from core.models import init
<<<<<<< HEAD
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotAllowed
import json
import logging

logger = logging.getLogger(__name__)
@csrf_exempt
def game_state(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        left_paddle = data.get('leftPaddle')
        right_paddle = data.get('rightPaddle')
        ball = data.get('ball')
        logger.debug('POST SUCCESS')
        init(left_paddle, right_paddle, ball)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)
=======

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
        'score': game.score,
    })
    
>>>>>>> parent of a781ed6 (fix back/front migration issues)
