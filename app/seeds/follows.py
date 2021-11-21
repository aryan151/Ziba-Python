from app.models import db, Follow

 
def seed_follows():
    follow1 = Follow(follower_id=1, following_id=2)
    follow2 = Follow(follower_id=2, following_id=1)
    follow3 = Follow(follower_id=3, following_id=1)

    db.session.add(follow1)  
    db.session.add(follow2) 
    db.session.add(follow3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()