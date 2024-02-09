from django.db import models
from django.conf import settings
from django.contrib import admin

# Create your models here.


class Artist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True ,related_name='artist_profile')
    bio = models.TextField()
    contact_info = models.CharField(max_length=255, blank=True, null=True)
    # followers = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)



    def __str__(self):
        return self.user.username 
    
    
    
class Follow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following')
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'artist')
    
class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    collaborators = models.ForeignKey(Artist , on_delete=models.DO_NOTHING)
    active = models.BooleanField(default=True)

    
    class Meta:
        unique_together = [['title', 'collaborators']]

class Artwork(models.Model):
    title = models.CharField(max_length=255)
    imageSrc = models.CharField(max_length=1000) 
    description = models.TextField()
    artist = models.CharField(max_length=50)
    project = models.OneToOneField(Project, on_delete=models.DO_NOTHING, null=True, blank=True)
    created_at = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)

    @property
    def highest_bid(self):
        highest_bid = self.bidded_artwork.aggregate(models.Max('amount'))['amount__max']
        return highest_bid


class Bid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork , on_delete=models.CASCADE , related_name='bidded_artwork')
    amount = models.DecimalField(max_digits=10, decimal_places=2)

