from django.shortcuts import render, redirect
import uuid
from .models import Url
from django.http import HttpResponse
from django.views.generic import CreateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json




# Create your views here.
def index(request):
    return render(request, 'index.html')

@method_decorator(csrf_exempt, name='dispatch')
class CreateView(CreateView):
    def post(self,request,format=None):
        body = json.loads(request.body.decode('utf-8'))
        link = body.get("link")
        uid = str(uuid.uuid4())[:5]
        new_url = Url(link=link,uuid=uid)
        new_url.save()
        return HttpResponse(uid)

def go(request,pk):
    url_details = Url.objects.get(uuid=pk)
    if str(url_details.link)[:5] == 'http:':
        return redirect(url_details.link)
    elif str(url_details.link)[:6] == 'https:':
        return redirect(url_details.link)
    else:
        return redirect("http://"+url_details.link)