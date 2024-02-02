from django.urls import path,include
from rest_framework_nested import routers
from . import  views



router = routers.DefaultRouter()

router.register('biddings' , views.BiddingViewSet , basename='biddings')
router.register("artworks" , views.ArtworkViewSet , basename="artworks")

urlpatterns = router.urls 
