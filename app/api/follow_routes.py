from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Follow, User, db

follow_routes = Blueprint('follows', __name__)


#Get Followers and Following of a User 
@follow_routes.route('/<int:id>')
@login_required
def user(id):
    followers = Follow.query.filter_by(following_id=id)
    following = Follow.query.filter_by(follower_id=id)

    all_followers = []
    all_following = []

    for user1 in followers:
        left = User.query.get(user1.follower_id)   
        all_followers.append(left.to_dict())

    for user2 in following:
        right = User.query.get(user2.following_id)  
        all_following.append(right.to_dict())


    return {'following': all_following, 'followers': all_followers}


# Connection -> Follow a User   
@follow_routes.route('/<int:id>', methods=['POST'])
@login_required
def follow(id):

    follow = Follow(follower_id=current_user.id, following_id=id)  

    db.session.add(follow)
    db.session.commit()

    return user(id)


#Connection -> Unfollow a User 
@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow(id):

    follow = Follow.query.filter_by(follower_id=current_user.id, following_id=id).first()

    db.session.delete(follow)
    db.session.commit()

    return user(id) 