from django.urls import path
from .views import movies, movie_detail


urlpatterns = [
    path('movies/', movies, name='movies'),
    path('movies/<int:id>/', movie_detail, name='movie_detail'),
]