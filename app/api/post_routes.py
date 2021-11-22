from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, User, Comment, Like
from datetime import datetime 
  
post_routes = Blueprint('posts', __name__)     

@post_routes.route('/feed')  
@login_required
def following_posts():  

    following_users = Follow.query.filter_by(follower_id=current_user.id).all()

    res_posts = []
    res_likes = []   


    for follow in following_users:    
        posts = Post.query.filter_by(user_id=follow.following_id).all()
        for post in posts:
            user = User.query.get(post.user_id)
            likes = Like.query.filter_by(post_id=post.id).all()
            for like in likes:
                user6 = User.query.filter_by(id=like.user_id).first()
                res_likes.append(user6.to_dict())
            res_posts.append({'post': post.to_dict(), 'user': user.to_dict(), 'likes': res_likes})
            res_likes = []  

    sort = sorted(res_posts, key=lambda x:x['post']['id'], reverse=True)  

    return {'feed': [post for post in sort]}  