from django.contrib import admin
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.utils.html import format_html, urlencode
from django.urls import reverse
from .models import Artwork,Bid ,Collection,Artist , Project , Collaborator

# class WalletInline(admin.TabularInline):
#     model = Wallet

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'artworks_count']
    search_fields = ['title']

    @admin.display(ordering='artworks_count')
    def artworks_count(self, collection):
       
        return  collection.artworks_count

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            artworks_count=Count('artworks')
        )


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'artist', 'description', 'price', 'collection' , 'highest_bid')
    search_fields = ('title', 'artist')


    def highest_bid(self, obj):
        return obj.highest_bid

    highest_bid.short_description = 'Highest Bid'

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'artwork_title', 'amount')
    search_fields = ('user__username', 'artwork__title')


    def artwork_title(self,bid):
        return bid.artwork.title

    artwork_title.short_description = 'artwork'
    
    
    
    
@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',  'bio')
    search_fields = ('user__username', )

  
    
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',  'creator' , 'description' , 'visibility' , 'created_at')
    search_fields = ('creator__username', 'title')

  
@admin.register(Collaborator)
class CollaboratorAdmin(admin.ModelAdmin):
    list_display = ('id', 'artist',  'project')
    search_fields = ('artist__user', 'project')

  