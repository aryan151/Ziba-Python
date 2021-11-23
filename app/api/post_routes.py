from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, User, Comment, Like
from datetime import datetime   
  
post_routes = Blueprint('posts', __name__)     

  
@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()  
    return {'posts': [post.to_dict() for post in posts]}
 


#Route for Main Feed (/Home) --> All images from Followed Accounts 
@post_routes.route('/following')
@login_required
def following_posts():

    following = Follow.query.filter_by(follower_id=current_user.id).all()

    all_posts = []
    likes_comp = []  
    complete_comments = []  

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

    sort = sorted(all_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'following': [post for post in sort]} 
 

#Route for Discover Feed (/Discover) --> All images from Accounts not followed or the Current User 
@post_routes.route('/discover')
@login_required
def discover_posts():

    all_posts = [] 
    likes_comp = []  
    complete_comments = []  
 
    following = Follow.query.filter_by(follower_id=current_user.id).all()
    userIds = [follow.to_dict()['following_id'] for follow in following] 

    posts = Post.query.filter(Post.user_id !=current_user.id, Post.user_id.notin_(userIds)).all()
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

    sort = sorted(all_posts, key=lambda x:x['post']['id'], reverse=True)

    return {'discover': [post for post in sort]} 


@post_routes.route('/single/<int:id>')   
@login_required 
def spec_posts(id):
    post = Post.query.get(id)

    likes_comp = []
    comment_comp = []

    user = User.query.filter_by(id=post.user_id).first()

    likes = Like.query.filter_by(post_id=post.id).all()
    for like in likes:
        user = User.query.filter_by(id=like.user_id).first()
        likes_comp.append(user.to_dict())

    comments = Comment.query.filter_by(post_id=post.id).all()
    for comment in comments:
        user2 = User.query.filter_by(id=comment.user_id).first()
        comment_comp.append({'comment': comment.to_dict(), 'user': user2.to_dict()})

    return {'single': {'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp, 'user': user.to_dict()}}




