from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import FormView

from authorization.forms import UserCreateForm


class SignInFormView(FormView):
    form_class = AuthenticationForm
    success_url = "/"
    template_name = "authorization/signin.html"

    def form_valid(self, form):
        self.user = form.get_user()
        login(self.request, self.user)
        return super(SignInFormView, self).form_valid(form)


class SignUpFormView(FormView):
    form_class = UserCreateForm
    success_url = reverse_lazy("home")

    template_name = "authorization/signup.html"

    def form_valid(self, form):
        self.user = form.save(True)
        login(self.request, self.user)
        return super(SignUpFormView, self).form_valid(form)

    def form_invalid(self, form):
        return super(SignUpFormView, self).form_invalid(form)


class LogoutFormView(FormView):
    def get(self, request):
        logout(request)
        return redirect("/")
