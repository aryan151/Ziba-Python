from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(500), nullable=True)
    lat = db.Column(db.Float, nullable=True, default=40.7128)  
    long = db.Column(db.Float, nullable=True, default=74.0060)    
    tags = db.Column(db.ARRAY(db.String(100)), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)   

    #Relationships 
    user = db.relationship("User", back_populates='post')
    like = db.relationship("Like", back_populates="post", cascade="all,delete-orphan")   
    comment = db.relationship("Comment", back_populates="post", cascade="all,delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,  
            'user_id': self.user_id,
            'img_url': self.img_url,
            'caption': self.description,
            'lat': self.lat,
            'long': self.long,
            'tags': self.tags,
            'createdAt': self.createdAt      
        } 
        
