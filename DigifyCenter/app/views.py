from django.shortcuts import render
from django.http import HttpResponse
from . import models
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def index(request):
    return render(request, 'index.html')


def pricing(request):
    return render(request, 'pricing.html')


@csrf_exempt
def GetDetails(request):
    
    if request.method == 'POST':
        name = request.POST.get('name', None)
        email = request.POST.get('email', None)
        contact_number = request.POST.get('contact_number', None)

        models.Registration.objects.create(name=name, contact_number=contact_number, email=email)
        return HttpResponse(0)
    else:
        return HttpResponse(-1)

