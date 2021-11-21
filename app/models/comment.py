from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    total_likes = db.Column(db.Integer, nullable=True, default=0)
    body = db.Column(db.String(300), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False) 

    #Relationships 

    user = db.relationship("User", back_populates="comment")
    post = db.relationship("Post", back_populates="comment")  

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'total_likes': self.total_likes,
            'body': self.description,
            'createdAt': self.createdAt   
        }

