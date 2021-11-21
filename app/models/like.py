from .db import db
from datetime import datetime   

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())  

    #Relationships 
    user = db.relationship("User", back_populates="like")
    post = db.relationship("Post", back_populates="like")  


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'createdAt': self.createdAt
        }

