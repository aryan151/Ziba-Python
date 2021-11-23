from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, User, Post, db
from .post_routes import master 
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def post_comment():  
 
    new_comment = request.json

    comment = Comment(
    
    user_id=new_comment['user_id'], 
    post_id=new_comment['post_id'],
    body=new_comment['body'],
    total_likes=0,
    createdAt=datetime.now())      

    db.session.add(comment)
    db.session.commit()

    return master()


@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):

    data = request.json

    comment = Comment.query.get(comment_id)

    comment.body = request.json['body']

    db.session.commit()

    return master()  



@comment_routes.route('/<int:comment_id>', methods=['DELETE'])  
@login_required
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return master()      