from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    follower = models.ManyToManyField('User', blank=True, related_name='followingUsers')
    followingUser = models.ManyToManyField('User', blank=True, related_name='followers')

    def __str__(self) -> str:
        return self.username

class Post(models.Model):
    poster = models.ForeignKey("User",on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField('User', blank=True)

    def __str__(self) -> str:
        return f'{self.poster} {self.timestamp} {self.content}'

    def serialize(self):
        return {
            "id": self.id,
            "poster": self.poster.username,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "likes": len(self.likes.all())
        }