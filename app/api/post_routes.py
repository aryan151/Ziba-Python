from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, User, Comment, Like
from datetime import datetime 
  
post_routes = Blueprint('posts', __name__)     

@post_routes.route('/<int:id>')
def get_main_posts(id):
    posts = []
    follows = Follow.query.filter_by(follower_id=current_user.id).all()
    userIds = [follow.to_dict()['followId'] for follow in follows]
    for i in userIds:
        posts.append(Post.query.filter(Post.userId == i).first())
    return {'posts': [post.to_dict() for post in posts]}