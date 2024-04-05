from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import  IsAdminUser, IsAuthenticated,AllowAny
from rest_framework.filters import SearchFilter
from django.views.generic import TemplateView

from .models import Artwork , Bid,Collection, Buyer, Artist , Project , Follow , Collaborator
from .serializers import (
    ArtworkSerializer,ArtistCreateSerializer, BidSerializer,BidCreateSerializer,
    ArtistSerializer, ArtistCreateSerializer,ArtistSerializer,
    FollowSerializer , ProjectSerializer ,ArtworkCreateSerializer , CollectionSerializer,
    ProjectCreateSerializer, CollaboratorSerializer ,
    CollaboratorCreateSerializer , BuyerCreateSerializer , BuyerSerializer)


# Create your views here.

class ReactAppView(TemplateView):
    template_name = 'index.html'

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['title' , 'description' , 'artist']
    # permission_classes = [IsAuthenticated]
    
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ArtworkCreateSerializer
        return ArtworkSerializer
            
class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

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
    
    def create(self, request, *args, **kwargs):
        # (project, created) = Project.objects.get_or_create(
        #     creator_id=request.user.id)
       
        project_serializer = ProjectCreateSerializer(data=request.data)
        project_serializer.is_valid(raise_exception=True)
        project_instance = project_serializer.save()
        
        collaborator_serializer = CollaboratorCreateSerializer(data={'artist': project_instance.creator.id, 'project': project_instance.id})
        collaborator_serializer.is_valid(raise_exception=True)
        collaborator_serializer.save()
        
        return Response(project_serializer.data)
        
class BuyerVieSet(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BuyerCreateSerializer  
        return BuyerSerializer
    
    
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
            
            
            