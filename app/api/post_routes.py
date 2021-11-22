from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, User, Comment, Like
from datetime import datetime   
  
post_routes = Blueprint('posts', __name__)     

@post_routes.route('/following')
@login_required
def following_posts():

    following = Follow.query.filter_by(follower_id=current_user.id).all()

    all_posts = []
    likes_comp = []

    complete_comments = []

    complete_comments2 = []
    likes_comp2 = []

    for follow in following:
        posts = Post.query.filter_by(user_id=follow.following_id).all()
        for post in posts:
            user = User.query.get(post.user_id)
            comments = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
            for comment in comments:
                comment_user = User.query.get(comment.user_id)
                complete_comments.append({'comment': comment.to_dict(), 'user': comment_user.to_dict()})
            likes = Like.query.filter_by(post_id=post.id).all()
            for like in likes:
                user6 = User.query.filter_by(id=like.user_id).first()
                likes_comp.append(user6.to_dict())
            all_posts.append({'post': post.to_dict(), 'user': user.to_dict(), 'comments': complete_comments, 'likes': likes_comp})
            complete_comments = []
            likes_comp = []

    user_posts = Post.query.filter_by(user_id=current_user.id).all()

    for post in user_posts:
        comments2 = Comment.query.filter_by(post_id=post.id).order_by(Comment.id.desc()).all()
        for comment2 in comments2:
            comment_user2 = User.query.get(comment2.user_id)
            complete_comments2.append({'comment': comment2.to_dict(), 'user': comment_user2.to_dict()})
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user5 = User.query.filter_by(id=like.user_id).first()
            likes_comp2.append(user5.to_dict())
        all_posts.append({'post': post.to_dict(), 'user': current_user.to_dict(), 'comments': complete_comments2, 'likes': likes_comp2})
        complete_comments2 = []
        likes_comp2 = []

    sort = sorted(all_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'following': [post for post in sort]} 