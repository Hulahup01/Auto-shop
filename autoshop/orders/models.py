from django.db import models
from django.utils import timezone

from authorization.models import CustomUser
from autoparts.models import Product


class Purchase(models.Model):
    quantity = models.PositiveIntegerField(default=1, verbose_name="Quantity of product units")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name="Product")
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Total price")
    date_of_purchase = models.DateTimeField(default=timezone.now, verbose_name="Date of purchase")
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="purchases", null=True, blank=True, verbose_name="User")

    class Meta:
        verbose_name = 'Purchase'
        verbose_name_plural = 'Purchases'
        ordering = ['date_of_purchase']

    def __str__(self):
        return f"'{self.buyer.first_name}' bought: {self.product} - {self.quantity} units for {self.price}"

