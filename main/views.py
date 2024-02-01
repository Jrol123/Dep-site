from django.shortcuts import render
from .models import *

def index(request):
    news_all = News.objects.all().order_by('-date')[:3]

    news = []
    for single_news in news_all:
        if len(single_news.title) > 45:
            limited_title = single_news.title[:45] + "..."
        else:
            limited_title = single_news.title

        news.append([limited_title, single_news.date.strftime('%d.%m.%Y')])

    return render(request, 'main/index.html', {
        'news': news,
    })
