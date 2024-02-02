from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import  IsAdminUser, IsAuthenticated

from .models import Artwork , Bid
from .serializers import ArtworkSerializer, BidSerializer,BidCreateSerializer


# Create your views here.

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    permission_classes = [IsAuthenticated]
    

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BidCreateSerializer  
        return BidSerializer 