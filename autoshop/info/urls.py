from django.urls import path
from .views import (
    HomePageTemplateView,
    FAQPageTemplateView,
    ContactsPageTemplateView,
    AboutPageTemplateView,
    VacanciesPageTemplateView,
    NewsListView,
    NewsDetailView,
    StatisticView,
)

urlpatterns = [
    path('', HomePageTemplateView.as_view(), name='home'),
    path('faq/', FAQPageTemplateView.as_view(), name='faq'),
    path('contacts/', ContactsPageTemplateView.as_view(), name='contacts'),
    path('about/', AboutPageTemplateView.as_view(), name='about'),
    path('vacancies/', VacanciesPageTemplateView.as_view(), name='vacancies'),
    path('news/', NewsListView.as_view(), name='news'),
    path('news/<slug:slug>', NewsDetailView.as_view(), name='news-detail'),
    path("statistics/", StatisticView.as_view(), name="statistics"),
]
