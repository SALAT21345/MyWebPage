from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def MainPage(request):
    return render(request, 'MainApp/MainPage.html')