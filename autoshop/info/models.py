from django.utils import timezone
from django.db import models
from django.urls import reverse


class News(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    content = models.TextField(verbose_name="Content news")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Creation time")
    image = models.ImageField(
        upload_to="news/images/",
        null=True,
        blank=False,
        verbose_name="News image",
    )

    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'
        ordering = ['created_at',]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("news-detail", args=[str(self.slug)])
