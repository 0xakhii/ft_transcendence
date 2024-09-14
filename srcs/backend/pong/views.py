# from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def test(request):
    return JsonResponse({'status': 'Backend is working!'})