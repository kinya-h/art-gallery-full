from django.contrib import admin
from .models import Artwork,Bid ,Artist , Project

# class WalletInline(admin.TabularInline):
#     model = Wallet

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'artist', 'description', 'price', 'category' , 'highest_bid')
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
    list_display = ('id', 'title',  'creator' , 'description' , 'created_at')
    search_fields = ('creator__username', 'title')

  