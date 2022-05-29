import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError, models
from django.db.models import manager
from django.db.models.manager import BaseManager
from django.db.models.query import QuerySet
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from .models import User, Post


def index(request):
    return render(request, "network/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

# API Route to add a new post
@csrf_exempt
@login_required
def new_post(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    print(data)
    
    content = data.get('content', '')
    post = Post(
        poster = request.user,
        content = content
    )
    print(post)
    post.save()

    return JsonResponse({"message": "Posted successfully."}, status=201)

# API Route to edit a post
@csrf_exempt
@login_required
def edit_post(request, id):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    
    content = data.get('content', '')
    post = Post.objects.get(id = id)
    post.content = content
    post.save()

    return JsonResponse({"message": "Posted successfully."}, status=201)

# API Route to get posts
def posts(request, username, num):
    posts = Post.objects.all().order_by("-timestamp").all()
    paginator = Paginator(posts, 10)
    posts = paginator.page(num).object_list
    sending_posts = [post.serialize() for post in posts]
    for post in sending_posts:
        if username in post["likers"]:
            post["liked"] = 1
        else:
            post["liked"] = 0
    
    return JsonResponse({
        'posts': sending_posts,
        'previous': paginator.page(num).has_previous(),
        'next': paginator.page(num).has_next(),
    })

# API Route to get Profile of a user
def profile(request, username, num):
    print(f'Is {request.user} following {username}')
    print(type(request.user))
    print(request.user.username)
    print(type(request.user.username))
    username = username.strip()
    user = User.objects.get(username = username)
    print(user.follower.all(), 'getting data')
    if request.method == 'GET':
        if request.user.username == username:
            follow = 0
        elif request.user.username not in [user.username for user in user.follower.all()]:
            follow = 1
        else:
            follow = 2
        print(follow)
        posts = user.posts.all().order_by("-timestamp").all()
        paginator = Paginator(posts, 10)
        posts = paginator.page(num).object_list
        return JsonResponse({
            'username': username,
            'follower': len(user.follower.all()),
            'following': len(user.followingUser.all()),
            'posts': [post.serialize() for post in posts],
            'follow': follow,
            'previous': paginator.page(num).has_previous(),
            'next': paginator.page(num).has_next(),
            'liked': 1
        })

# Page to get Profile of a user
def profile_page(request, username):
    return render(request, 'network/profile.html', {
        'username': username
    })

# API Route to get Following
@login_required
def following_posts(request, num):
    username = request.user.username
    print(username)
    user = request.user
    followingUsers = user.followingUser.all()
    print(followingUsers)
    posts = user.posts.none()
    print(f'posts={posts}')
    for following in followingUsers:
        print(following.posts.all())
        posts = posts.union(following.posts.all())
    posts = posts.order_by("-timestamp").all()
    paginator = Paginator(posts, 10)
    posts = paginator.page(num).object_list
    sending_posts = [post.serialize() for post in posts]
    for post in sending_posts:
        if username in post["likers"]:
            post["liked"] = 1
        else:
            post["liked"] = 0
        print(post['liked'])
    
    return JsonResponse({
        'posts': [post.serialize() for post in sending_posts],
        'previous': paginator.page(num).has_previous(),
        'next': paginator.page(num).has_next()
    })

# Page to get Following users' posts
@login_required
def following_page(request):
    return render(request, 'network/following.html')

# API Route to Like a post
@csrf_exempt
@login_required
def like(request, id):
    post = Post.objects.get(id = id)
    print(f'{request.user} liked/disliked post no.{id}')
    if request.method == 'PUT':
        data = json.loads(request.body)
        if int(data.get('like')) == 1 and request.user not in post.likes.all():
            post.likes.add(request.user)
        elif int(data.get('like')) == 1 and request.user in post.likes.all():
            post.likes.remove(request.user)
        post.save()
        return HttpResponse(status=204)

# API Route to Follow a user
@login_required
def follow(request, username):
    username = username.strip()
    user = User.objects.get(username = username)
    followingUsers = user.followingUser.all()
    followingUsers = [followingUser.username for followingUser in followingUsers]
    print(followingUsers)
    if request.method == 'POST':
        follow = int(request.POST.get('follow'))
        if follow == 0:
            print('Unfollowed')
            user.follower.remove(request.user)
            request.user.followingUser.remove(user)
        elif follow == 1:
            print('Followed')
            user.follower.add(request.user)
            request.user.followingUser.add(user)
        user.save()
        print(user.follower.all(), 'following or unfollowing')
        return HttpResponse(status=204)
# fetch(`/emails/${email.id}`, {
# method: 'PUT',
# body: JSON.stringify({
#     archived: true
# })
# })