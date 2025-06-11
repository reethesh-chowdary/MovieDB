from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import User,Movie
from django.utils import timezone
from django.urls import path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def signup(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        password=make_password(password)  # Hash the password!
    )
    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def signin(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, user.password):
        return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'Signin successful.', 'user_id': user.id})


@api_view(['GET','POST'])
def movies(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        movie_list = []
        for movie in movies:
            movie_list.append({
                'id': movie.id,
                'title': movie.title,
                'year': movie.year,
                'genre': movie.genre,
                'status': movie.status,
                'image_URL': movie.image_URL,
                'rating': movie.rating,
                'review': movie.review,
                'watched_date': movie.watched_date,
                'user_id': movie.user.id
            })
        return Response(movie_list)

    elif request.method == 'POST':
        data = request.data
        print(data)
        user = User.objects.get(id=1)
        new_movie = Movie.objects.create(
            title=data['title'],
            year=data['year'],
            genre=data['genre'],
            image_URL=data.get('image_URL'),
            rating=data.get('rating'),
            review=data.get('review'),
            user=user
        )
        return Response({'message': 'Movie added successfully', 'movie_id': new_movie.id})
@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, id):
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

    if request.method == 'GET':
        return Response({
            'id': movie.id,
            'title': movie.title,
            'year': movie.year,
            'genre': movie.genre,
            'status': movie.status,
            'image_URL': movie.image_URL,
            'rating': movie.rating,
            'review': movie.review,
            'watched_date': movie.watched_date,
            'user_id': movie.user.id
        })

    elif request.method == 'PUT':
        data = request.data
        movie.title = data.get('title', movie.title)
        movie.year = data.get('year', movie.year)
        movie.genre = data.get('genre', movie.genre)
        movie.status = data.get('status', movie.status)
        movie.image_URL = data.get('image_URL', movie.image_URL)
        movie.rating = data.get('rating', movie.rating)
        movie.review = data.get('review', movie.review)
        if data['status'] == 'Watched' and not movie.watched_date:
            movie.watched_date = timezone.now().date()
        elif data['status'] == 'Wishlist':
            movie.watched_date = None
        movie.save()
        return Response({'message': 'Movie updated successfully'})

    elif request.method == 'DELETE':
        movie.delete()
        return Response({'message': 'Movie deleted successfully'})

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'This is a protected view'})