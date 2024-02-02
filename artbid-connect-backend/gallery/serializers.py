# serializers.py
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from .models import Artwork, Bid



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username' , "email"]
        

class ArtworkSerializer(serializers.ModelSerializer):
    highest_bid = serializers.SerializerMethodField()
    
    class Meta:
        model = Artwork
        fields = ['id', 'title', 'imageSrc', 'description', 'artist', 'created_at', 'price', 'category' , 'highest_bid']
    
    def get_highest_bid(self, artwork):
        highest_bid = artwork.bidded_artwork.aggregate(models.Max('amount'))['amount__max']
        return highest_bid or artwork.price



class BidSerializer(serializers.ModelSerializer):
    
    artwork = ArtworkSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Bid
        fields = ['id', 'user', 'artwork', 'amount']

    def get_artwork(self, obj):
        artwork = obj.artwork
        return {
            'id': artwork.id,
            'title': artwork.title,
            'artist': artwork.artist,
            'imageSrc': artwork.imageSrc,
            'description': artwork.description,
            'price': artwork.price,
            'created_at': artwork.created_at,
            'category': artwork.category,
        }

    def get_user(self,obj):
        user = obj.user
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

class BidCreateSerializer(serializers.ModelSerializer):
    artwork = serializers.PrimaryKeyRelatedField(queryset=Artwork.objects.all())  

    class Meta:
        model = Bid
        fields = ['id', 'user', 'artwork', 'amount']

  


    
   