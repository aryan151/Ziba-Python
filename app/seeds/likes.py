from app.models import db, Like      

def seed_likes():
    #Give Like in DB Default value of @ now 
    like1 = Like(user_id=1, post_id=6)
    like2 = Like(user_id=2, post_id=8)
    like3 = Like(user_id=3, post_id=1)
    like4 = Like(user_id=4, post_id=1) 
    like5 = Like(user_id=5, post_id=1)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()