from django.db import models
from django.conf import settings
from django.contrib import admin

# Create your models here.
class Collection(models.Model):
    title = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']

     

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
    PUBLIC = 'public'
    PRIVATE = 'private'
    
    VISIBILITY_CHOICES = [
        (PUBLIC, 'Public'),
        (PRIVATE, 'Private'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default=PUBLIC)

    def __str__(self):
        return self.title
    
    class Meta:
        unique_together = [['title', 'creator']]
        
    def __str__(self) -> str:
        return self.title  

class Collaborator(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('artist', 'project')
        

class Artwork(models.Model):
    title = models.CharField(max_length=255)
    imageSrc = models.CharField(max_length=1000) 
    description = models.TextField()
    artist = models.CharField(max_length=50)
    project = models.OneToOneField(Project, on_delete=models.DO_NOTHING, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    collection = models.ForeignKey(
    Collection, on_delete=models.PROTECT, null=True, related_name='artworks')

    @property
    def highest_bid(self):
        highest_bid = self.bidded_artwork.aggregate(models.Max('amount'))['amount__max']
        return highest_bid


class Bid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork , on_delete=models.CASCADE , related_name='bidded_artwork')
    amount = models.DecimalField(max_digits=10, decimal_places=2)

