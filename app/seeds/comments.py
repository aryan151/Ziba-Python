from app.models import db, Comment
from datetime import datetime

def seed_comments():

    comment1 = Comment(user_id=3, post_id=1, body="comment1", total_likes =4,createdAt=datetime.now())
    comment2 = Comment(user_id=4, post_id=1, body="comment2", total_likes =2,createdAt=datetime.now())
    comment3 = Comment(user_id=1, post_id=6, body="comment3", total_likes =12,createdAt=datetime.now())

    db.session.add(comment1)    
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()
   

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()