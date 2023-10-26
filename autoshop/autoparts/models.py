from django.core.validators import MinValueValidator
from django.db import models
from django.urls import reverse
from django.utils.safestring import mark_safe


class Manufacturer(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Manufacture'
        verbose_name_plural = 'Manufacturers'


class ProductType(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type

    class Meta:
        verbose_name = 'Product type'
        verbose_name_plural = 'Product types'


class Product(models.Model):
    name = models.CharField(
        max_length=200,
        verbose_name="Product name",
    )
    vendor_code = models.CharField(
        max_length=10,
        unique=True,
        verbose_name="Vendor code",
    )
    product_type = models.ForeignKey(
        ProductType,
        related_name="products",
        on_delete=models.CASCADE,
        verbose_name="Product type",
    )
    manufacturer = models.ForeignKey(
        Manufacturer, related_name="products",
        on_delete=models.CASCADE,
        verbose_name='Manufacturer'
    )
    image = models.ImageField(
        upload_to="autoparts/images/",
        blank=True,
        null=True,
        default="autoparts/images/default_product.png",
        verbose_name='Image of product',
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name='Price'
    )
    description = models.TextField(
        default=None,
        verbose_name='Description',
    )
    quantity = models.PositiveIntegerField(default=0,
                                           verbose_name='Quantity',
                                           )

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        slug = self.vendor_code.lower().replace(' ', '-')
        return reverse('product_detail', args=[slug])

    class Meta:
        verbose_name = 'Сar spare part'
        verbose_name_plural = 'Сar spare parts'
        ordering = ['price', 'quantity']
