from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone
from authorization.models import CustomUser


class Review(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5), ], verbose_name="Rating",
    )
    content = models.TextField(verbose_name="Text of review",)
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date of create")
    author = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, related_name="reviews", verbose_name="Author"
    )

    def __str__(self):
        return f" {self.title} - {self.created_at}"
