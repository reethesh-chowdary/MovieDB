from django.urls import path
from .views import movies, movie_detail , signup,signin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('movies/', movies, name='movies'),
    path('movies/<int:id>/', movie_detail, name='movie_detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
]