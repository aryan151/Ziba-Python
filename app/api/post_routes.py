import re
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, User, Comment, Like
from datetime import datetime     
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.post_form import createPost, deletePost, editPost
  
post_routes = Blueprint('posts', __name__)     

@post_routes.route('/', methods=["POST"])
@login_required
def add_post():
    form = createPost() 
    form['csrf_token'].data = request.cookies['csrf_token']

    if "img_url" not in form.data:
        return {"errors": "image required"}, 400

    image = form.data['img_url']

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400 

    url = upload["url"]


    if form.validate_on_submit():
        tags = form.data["tags"].split()  
        user_tags = form.data["user_tags"].split() 

        new_post = Post(  
            caption=form.data["caption"],
            img_url=url,
            user_id=form.data["user_id"],
            tags=tags
        )    
        
        db.session.add(new_post) 
        db.session.flush()
        db.session.refresh(new_post)  
    

        for one_tag in user_tags:
            user = User.query.filter(User.username == one_tag).first() 
            # newest = Post.query.order_by(Post.id.desc()).first() 
            if (user):
                user.user_tags.append(new_post.id)            
    


        db.session.commit()     
  
        return 'Good Data'
    else:
        return "Bad Data"

    user = User.query.get(user_id)

    new_saved_posts = [post for post in user.saved]
    new_saved_posts.append(post_id)

    user.saved = new_saved_posts   

    db.session.commit()

@post_routes.route('/', methods=["PUT"])
@login_required
def edit_post(): 
    form = editPost()  
    data = form.data        
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.filter(Post.id == data["post_id"]).first()

    post.caption = data["caption"]  
    post.tags = data["tags"].split()  

    db.session.commit()    

    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}





@post_routes.route('/', methods=["DELETE"])
@login_required
def delete_post():
    form = deletePost() 
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    deleted_post= Post.query.filter(Post.id == data["id"]).first()
    db.session.delete(deleted_post)    
    db.session.commit()

    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}




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

#Get posts from array of postIds   
@post_routes.route('/array/<int:id>') 
@login_required     
def array_posts(id):      
    
    user = User.query.filter_by(id=id).first()   
  
    posts = Post.query.filter(Post.id.in_(user.saved)).order_by(Post.id.desc()).all() 
    likes_comp = []
    comment_comp = [] 
    res = []

    for post in posts:
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user = User.query.filter_by(id=like.user_id).first()
            likes_comp.append(user.to_dict())

        comments = Comment.query.filter_by(post_id=post.id).all()
        for comment in comments:
            user2 = User.query.filter_by(id=comment.user_id).first()
            comment_comp.append(user2.to_dict())

        res.append({'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp})
        likes_comp = []
        comment_comp = []

    return {'arr': [x for x in res]}  

@post_routes.route('/tagged/<int:id>')  
@login_required     
def tagged_posts(id):       
     
    user = User.query.filter_by(id=id).first()      
  
    posts = Post.query.filter(Post.id.in_(user.user_tags)).order_by(Post.id.desc()).all() 
    likes_comp = []
    comment_comp = [] 
    res = []

    for post in posts:
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user = User.query.filter_by(id=like.user_id).first()
            likes_comp.append(user.to_dict())

        comments = Comment.query.filter_by(post_id=post.id).all()
        for comment in comments:
            user2 = User.query.filter_by(id=comment.user_id).first()
            comment_comp.append(user2.to_dict())

        res.append({'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp})
        likes_comp = []
        comment_comp = []

    return {'arr': [x for x in res]}  


#Find Info on a Single Post  
@post_routes.route('/single/<int:id>')   
@login_required 
def one_post(id):
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


#All Posts of a single User      
@post_routes.route('/<int:id>')
@login_required
def posts(id):
    posts = Post.query.filter_by(user_id=id).order_by(Post.id.desc()).all()

    likes_comp = []
    comment_comp = []
    res = []

    for post in posts:
        likes = Like.query.filter_by(post_id=post.id).all()
        for like in likes:
            user = User.query.filter_by(id=like.user_id).first()
            likes_comp.append(user.to_dict())

        comments = Comment.query.filter_by(post_id=post.id).all()
        for comment in comments:
            user2 = User.query.filter_by(id=comment.user_id).first()
            comment_comp.append(user2.to_dict())

        res.append({'post': post.to_dict(), 'likes': likes_comp, 'comments': comment_comp})
        likes_comp = []
        comment_comp = []

    return {'posts': [x for x in res]}    




##Saved Routes 
@post_routes.route('/saved/<int:user_id>/<int:post_id>/', methods=["POST"])
@login_required
def add_saved(user_id, post_id):

    user = User.query.get(user_id)

    new_saved_posts = [post for post in user.saved]
    new_saved_posts.append(post_id)

    user.saved = new_saved_posts   

    db.session.commit()

    return user.to_dict()


@post_routes.route('/saved/<int:user_id>/<int:post_id>/', methods=["DELETE"])
@login_required
def delete_saved(user_id, post_id):


    
    user = User.query.get(user_id)  

  
    new_saved_posts = [post for post in user.saved]
    new_saved_posts.remove(post_id)

    user.saved = new_saved_posts

    db.session.commit()

    return user.to_dict()