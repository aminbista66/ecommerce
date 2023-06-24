from django.db import models
from user.models import User

class ShippingInfo(models.Model):
    PAYMENT_METHOD = (
        ('COD', 'COD'),
        ('Card', 'Card')
    )
    phone = models.CharField(max_length=14, null=False, blank=False)
    address = models.CharField(max_length=225*8, null=False, blank=False)
    city = models.CharField(max_length=225*4, null=False, blank=False)
    postal_code = models.CharField(max_length=10, null=False, blank=False)
    payment_method = models.CharField(max_length=255, null=False, blank=False, choices=PAYMENT_METHOD, default='COD')


class Package(models.Model):
    weight = models.FloatField(null=False, blank=False)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    reciver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reciver')
    shipping_info = models.ForeignKey(ShippingInfo, on_delete=models.CASCADE, null=True)