from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=100, help_text="Enter first name")
    last_name = models.CharField(max_length=100, help_text="Enter last name")
    date_birth = models.DateField(help_text="")
    phone_number = models.CharField(max_length=50, help_text="Enter phone number")

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["first_name", "last_name", "date_birth", "phone_number"]

    def __str__(self):
        return f"{self.email} {self.first_name} {self.last_name}"
