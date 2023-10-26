from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView

from .models import Review


class ReviewListView(ListView):
    template_name = "reviews/review-list.html"
    model = Review


class ReviewCreateView(LoginRequiredMixin, CreateView):
    model = Review
    template_name = "reviews/review-create.html"
    fields = ("title", "rating", "content")
    success_url = reverse_lazy("review-list")
    login_url = reverse_lazy("signin")

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
