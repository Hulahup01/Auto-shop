from django.urls import path

from authorization.views import SignUpFormView, SignInFormView, LogoutFormView

urlpatterns = [
    path('signup/', SignUpFormView.as_view(), name="signup"),
    path('signin/', SignInFormView.as_view(), name="signin"),
    path('logout/', LogoutFormView.as_view(), name="logout"),
]
