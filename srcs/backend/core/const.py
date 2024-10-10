from django.http import HttpResponseNotAllowed
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json

canvasWidth = -1
canvasHeight = -1

@api_view(['POST'])
def getWinSize(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            canvasWidth = data.get('canvasWidth', -1)
            canvasHeight = data.get('canvasHeight', -1)
            
            if canvasWidth == -1 or canvasHeight == -1:
                return JsonResponse({'error': 'Invalid input'}, status=400)
            
            return JsonResponse({
                'canvasWidth': canvasWidth,
                'canvasHeight': canvasHeight
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return HttpResponseNotAllowed(['POST'])