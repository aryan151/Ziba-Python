from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'        
 
    id = db.Column(db.Integer, primary_key=True)  
    f_name = db.Column(db.String(100), nullable=False,)
    l_name = db.Column(db.String(100), nullable=False,)    
    avatar = db.Column(db.String(3000), nullable=True, default='https://lh3.googleusercontent.com/proxy/Ixnvznf8qytejesCqIBuJBKKa9Mm8O9n60a-Cw2aouKvO3JXZlxz8tT2WxU18ruiHVuOItl1oDguCib88uD-WKJUGLgFS762ERJsdTbZYk3Ai113jA')
    username = db.Column(db.String(40), nullable=False, unique=False)  
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(750), nullable=True)    
    hashed_password = db.Column(db.String(255), nullable=False) 
    saved = db.Column(db.ARRAY(db.Integer), default=[])   
    user_tags = db.Column(db.ARRAY(db.Integer), default=[])   
    lat = db.Column(db.Float, nullable=True, default=40.7128)  
    long = db.Column(db.Float, nullable=True, default=74.0060)   
    private = db.Column(db.Boolean, nullable=True, default=False)      

    #Relationships 
    post = db.relationship('Post', back_populates="user", cascade="all,delete-orphan")
    comment = db.relationship("Comment", back_populates="user", cascade="all,delete-orphan")
    like = db.relationship("Like", back_populates="user", cascade="all,delete-orphan")  

    follower = db.relationship("Follow", back_populates="follower_user", foreign_keys="Follow.follower_id", cascade="all,delete-orphan")
    following = db.relationship("Follow", back_populates="following_user", foreign_keys="Follow.following_id", cascade="all,delete-orphan")

    sender = db.relationship("Message", back_populates="sender_user", foreign_keys="Message.sender_id", cascade="all,delete-orphan")
    receiver = db.relationship("Message", back_populates="receiver_user", foreign_keys="Message.receiver_id", cascade="all,delete-orphan")
    user_1 = db.relationship("Channel", back_populates="user1", foreign_keys="Channel.user1_id", cascade="all,delete-orphan") 
    user_2 = db.relationship("Channel", back_populates="user2", foreign_keys="Channel.user2_id", cascade="all,delete-orphan")

    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'f_name': self.f_name,
            'l_name': self.l_name,
            'avatar': self.avatar,
            'username': self.username,
            'email': self.email,
            'bio': self.bio, 
            'saved': self.saved,
            'user_tags': self.user_tags,
            'lat': self.lat,
            'long': self.long, 
            'private': self.private
        }
  