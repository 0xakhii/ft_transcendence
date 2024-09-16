from django.http import HttpResponse

def test(request):
    return HttpResponse("Backend is working!")

def home(request):
    return HttpResponse("Welcome to the homepage!")
