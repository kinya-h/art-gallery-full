from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import  IsAdminUser, IsAuthenticated,AllowAny


from .models import Artwork , Bid
from .serializers import ArtworkSerializer, BidSerializer,BidCreateSerializer


# Create your views here.

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [AllowAny]

class BiddingViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    permission_classes = [IsAuthenticated]
    

    def get_serializer_class(self):
        if self.request.method == 'POST':
            print(self.request.data)
            return BidCreateSerializer  
        return BidSerializer 



    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        user_bids = Bid.objects.filter(user=request.user)

        if request.method == 'GET':
            serializer = BidSerializer(user_bids, many=True)
            return Response(serializer.data)     

        # elif request.method == 'PUT':
        #     serializer = BidCreateSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save(user=request.user)
        #         return Response({'message': 'Bid created successfully'})
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    