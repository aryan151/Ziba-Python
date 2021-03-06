from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, User, Post, db
from app.forms.comment_form import DeleteComment, EditComment, AddComment
from .post_routes import master 
from datetime import datetime
from app.forms.comment_form import DeleteComment, EditComment, AddComment 

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def post_comment():  
 
    new_comment = request.json

    comment = Comment(
    
    user_id=new_comment['user_id'], 
    post_id=new_comment['post_id'],
    body=new_comment['body'],
    createdAt=datetime.now())      

    db.session.add(comment)
    db.session.commit()

    return master()


@comment_routes.route('/', methods=["PUT"])
@login_required
def edit_comment():

    form = EditComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        comment = Comment.query.filter(Comment.id == data["id"]).first()
        comment.body = data["body"]

        db.session.commit()
        posts = Post.query.all()    
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return "Bad Data"

 
     
@comment_routes.route('/', methods=['DELETE'])  
@login_required
def delete_comment():

    form = DeleteComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    comment_to_delete = Comment.query.filter(Comment.id == data["comment_id"]).first()
    db.session.delete(comment_to_delete)
    db.session.commit()

    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}                  
