from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import  IsAdminUser, IsAuthenticated,AllowAny


from .models import Artwork , Bid,Collection, Artist , Project , Follow , Collaborator
from .serializers import (
    ArtworkSerializer,ArtistCreateSerializer, BidSerializer,BidCreateSerializer,
    ArtistSerializer, ArtistCreateSerializer,ArtistSerializer,
    FollowSerializer , ProjectSerializer ,ArtworkCreateSerializer , CollectionSerializer,ProjectCreateSerializer, CollaboratorSerializer , CollaboratorCreateSerializer)


# Create your views here.

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    # permission_classes = [IsAuthenticated]
    
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ArtworkCreateSerializer
        return ArtworkSerializer
            
class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

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



class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    # serializer_class = ArtistSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ArtistCreateSerializer  
        return ArtistSerializer
    
    @action(detail=False, methods=['GET', 'PUT'] , permission_classes=[IsAuthenticated])
    def me(self, request):
        artist = Artist.objects.filter(user=request.user)

        if request.method == 'GET':
            serializer = ArtistSerializer(artist, many=True)
            return Response(serializer.data)     

        # elif request.method == 'PUT':
        #     serializer = BidCreateSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save(user=request.user)
        #         return Response({'message': 'Bid created successfully'})
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProjectCreateSerializer  
        return ProjectSerializer
    
    
class CollaboratorViewSet(viewsets.ModelViewSet):
    queryset = Collaborator.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CollaboratorCreateSerializer  
        return CollaboratorSerializer
    
    
    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        try:
            artist = Collaborator.objects.filter(artist__user=request.user)

            if request.method == 'GET':
                serializer = CollaboratorSerializer(artist, many=True)
                return Response(serializer.data)     
        
        except Exception as e:
            return Response({'message': 'Invalid Request , access token Required!'} , status=status.HTTP_400_BAD_REQUEST)
            
            
            