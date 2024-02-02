from django.db import models
from django.conf import settings
from django.contrib import admin

# Create your models here.

class Artwork(models.Model):
    title = models.CharField(max_length=255)
    imageSrc = models.CharField(max_length=1000) 
    description = models.TextField()
    artist = models.CharField(max_length=50)
    created_at = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)

    @property
    def highest_bid(self):
        highest_bid = self.bidded_artwork.aggregate(models.Max('amount'))['amount__max']
        return highest_bid


class Bid(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork , on_delete=models.CASCADE , related_name='bidded_artwork')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
