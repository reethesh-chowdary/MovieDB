from django.contrib import admin

# Register your models here.
from .models import User,Movie 
admin.site.register(User)
admin.site.register(Movie)