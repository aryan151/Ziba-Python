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
 


#Route for all posts associated with user (following & owned)
@post_routes.route('/master') 
@login_required 
def master(): 


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
                user2 = User.query.filter_by(id=like.user_id).first()
                likes_comp.append(user2.to_dict())
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

    return {'master': [post for post in sort]} 
 

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



@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_posts(post_id):

    post = Post.query.get(post_id)

    db.session.delete(post)
    db.session.commit()

    return master()

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):

    data = request.json

    post = Post.query.get(post_id)

    post.caption = request.json['caption']

    db.session.commit()

    return master()          



##Saved Routes 
@post_routes.route('/saved/<int:user_id>/<int:post_id>/', methods=["POST"])
def add_saved(user_id, post_id):

    
    user = User.query.get(user_id)

    new_saved_posts = [post for post in user.saved]
    new_saved_posts.append(post_id)

    user.saved = new_saved_posts   

    db.session.commit()

    return user.to_dict()


@post_routes.route('/saved/<int:user_id>/<int:post_id>/', methods=["DELETE"])
def delete_saved(user_id, post_id):


    
    user = User.query.get(user_id)  

  
    new_saved_posts = [post for post in user.saved]
    new_saved_posts.remove(post_id)

    user.saved = new_saved_posts

    db.session.commit()

    return user.to_dict()