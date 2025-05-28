from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=150,unique=True) 
    email = models.CharField(max_length=255)
    password = models.CharField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    genre = models.CharField(max_length=100) 
    STATUS_CHOICES = [
        ('Wishlist', 'Wishlist'),
        ('Watched', 'Watched'),
    ]

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='Wishlist'
    )
    rating = models.IntegerField(
        null=True,
        blank=True,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    review = models.TextField(null=True, blank=True)
    image_URL = models.URLField(null=True, blank=True)
    watched_date = models.DateField(null=True, blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.status == 'Watched' and self.watched_date is None:
            self.watched_date = timezone.now().date()
        elif self.status == 'Wishlist':
            self.watched_date = None
        super().save(*args, **kwargs)