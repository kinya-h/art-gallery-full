# serializers.py
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from .models import (
    Artwork, Bid,Artist, Follow, Project, Collaborator , Collection)



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username' , "email"]
        
class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id' , 'title']
        
        
class ArtworkSerializer(serializers.ModelSerializer):
    highest_bid = serializers.SerializerMethodField()
    collection = CollectionSerializer(read_only=True) 
    
    class Meta:
        model = Artwork
        fields = ['id', 'title', 'imageSrc', 'description', 'artist', 'created_at', 'price', 'collection' , 'highest_bid']
    
    def get_highest_bid(self, artwork):
        highest_bid = artwork.bidded_artwork.aggregate(models.Max('amount'))['amount__max']
        return highest_bid or artwork.price


class ArtworkCreateSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset= Artist.objects.all())
    collection = serializers.PrimaryKeyRelatedField(queryset= Collection.objects.all())
    project = serializers.PrimaryKeyRelatedField(queryset= Project.objects.all())
    
    class Meta:
        model = Artwork
        fields = [ 'title', 'imageSrc', 'description', 'artist', 'project', 'price', 'collection']
         
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
            'collection': artwork.collection,
        }

    def get_user(self,obj):
        user = obj.user
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

class BidCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
    artwork = serializers.PrimaryKeyRelatedField(queryset=Artwork.objects.all())  

    class Meta:
        model = Bid
        fields = ['user', 'artwork', 'amount']

  


class ArtistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Artist
        fields = ['id' , 'user' , 'bio']
        
    def get_user(self,obj):
        user = obj.user
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }



class ArtistCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  

    class Meta:
        model = Artist
        fields = ['user', 'bio']



class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['user', 'artist', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    
    creator = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = [ 'id' , 'title', 'description', 'creator', 'active', 'visibility', 'created_at']
    
    def get_creator(self,obj):
        user = obj.creator
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        

class ProjectCreateSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
    class Meta:
        model = Project
        fields = ['title', 'description', 'creator']
        
class CollaboratorSerializer(serializers.ModelSerializer):

    artist = ArtistSerializer(read_only=True)
    project = ProjectSerializer(read_only=True) 
    
    class Meta:
        model= Collaborator
        fields = ['artist' , 'project']        
    
    
    def get_artist(self,obj):
        artists = obj.artist.all()
        return [
            
           { 'id': artist.id,
            'username': artist.user.username,
            'email': artist.user.email,
        } for artist in artists
        
        
            ]

class CollaboratorCreateSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())        
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())        
    
    class Meta:
        model = Collaborator
        fields = ['artist' , 'project']
        depth = 1
        
# class ProjectCreateSerializer(serializers.ModelSerializer):
#     creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
#     class Meta:
#         model = Project
#         fields = ['title', 'description', 'creator', 'active', 'created_at']