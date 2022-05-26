
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('profile/<str:username>', views.profile_page, name='profile-page'),
    path('following', views.following_page, name='following'),

    # API Routes
    path('profile-api/<str:username>/<int:num>', views.profile, name='profile'),
    path('new-post', views.new_post, name='new-post'),
    path('edit-post/<int:id>', views.edit_post, name='edit-post'),
    path('posts-page/<int:num>', views.posts, name='posts'),
    path('posts/following-page/<int:num>', views.following_posts, name='following-posts'),
    path('posts/<int:id>/like', views.like, name='like')
]