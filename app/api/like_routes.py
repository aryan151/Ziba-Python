from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, User, Post, db, Like
from .post_routes import master 

like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:id>', methods=['POST'])
@login_required
def like_post(id):

    likeduser = current_user.id 
    like = Like.query.filter_by(user_id=likeduser, post_id=id).first()

    #Boolean value -> check true, else false 
    if like is None:
        create_like = Like(user_id=likeduser, post_id=id)
        db.session.add(create_like)
        db.session.commit()   

    else:  
        db.session.delete(like)
        db.session.commit()

    return master()   