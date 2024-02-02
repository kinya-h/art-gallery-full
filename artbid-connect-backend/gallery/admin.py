from django.contrib import admin
from .models import Artwork,Bid 

# class WalletInline(admin.TabularInline):
#     model = Wallet

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'artist', 'price', 'category' , 'highest_bid')
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