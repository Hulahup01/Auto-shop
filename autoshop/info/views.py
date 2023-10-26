import requests

from django.db.models import Sum, Count
from django.db.models.functions import Lower
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import TemplateView, ListView, DetailView

from authorization.models import CustomUser
from info.models import News
from orders.models import Purchase


class HomePageTemplateView(TemplateView):
    template_name = "info/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['latest_news'] = News.objects.order_by('created_at').first()
        return context


class FAQPageTemplateView(TemplateView):
    template_name = "info/faq.html"


class ContactsPageTemplateView(TemplateView):
    template_name = "info/contacts.html"


class AboutPageTemplateView(TemplateView):
    template_name = "info/about.html"


class VacanciesPageTemplateView(TemplateView):
    template_name = "info/vacancies.html"


class NewsListView(ListView):
    model = News
    template_name = "info/news_list.html"
    context_object_name = 'news'


class NewsDetailView(DetailView):
    model = News
    template_name = "info/news_detail.html"
    context_object_name = 'news'


class StatisticView(TemplateView):
    template_name = "info/statistic.html"

    def get(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return redirect(reverse("signin"))

        return super().get(request, args, kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        total_amount = Purchase.objects.aggregate(total=Sum('price'))['total']
        popular_product = Purchase.objects.values('product__name').annotate(total_sales=Count('product')).order_by(
            '-total_sales').first()
        sorted_users = CustomUser.objects.all().order_by(Lower('last_name'))
        most_popular_product_name = popular_product['product__name']

        try:
            response = requests.get('https://official-joke-api.appspot.com/random_joke')
            if response.status_code == 200:
                joke_data = response.json()
                joke_setup = joke_data['setup']
                joke_punchline = joke_data['punchline']
            else:
                joke_setup = 'No joke available'
                joke_punchline = 'No joke available'
        except:
            joke_setup = 'No joke?'
            joke_punchline = 'FIX Internet!'

        context = {
            'joke_setup': joke_setup, 'joke_punchline': joke_punchline,
            'total_amount': total_amount,
            'most_popular_product': most_popular_product_name,
            'sorted_users': sorted_users
        }

        return context

