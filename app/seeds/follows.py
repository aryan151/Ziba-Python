from app.models import db, Follow
from faker import Faker  
fake = Faker()  
from numpy.random import seed
from numpy.random import randint 
import numpy
from psycopg2.extensions import register_adapter, AsIs
def addapt_numpy_float64(numpy_float64):
    return AsIs(numpy_float64)
def addapt_numpy_int64(numpy_int64):
    return AsIs(numpy_int64)
register_adapter(numpy.float64, addapt_numpy_float64)
register_adapter(numpy.int64, addapt_numpy_int64) 

 
def seed_follows():

    for x in range (1,25):
        newfollow = Follow(
            follower_id = x,
            following_id = x +1
        )
        db.session.add(newfollow)

    for x in range (1,25):
        newfollow = Follow(
            follower_id = x,
            following_id = x +2
        )
        db.session.add(newfollow)

    for x in range (1,25):
        newfollow = Follow(
            follower_id = x,
            following_id = x +3
        )
        db.session.add(newfollow)

    for x in range (13,25):
        newfollow = Follow(
            follower_id = 1,
            following_id = x
        )
        db.session.add(newfollow)

    for x in range (13,25):
        newfollow = Follow(
            follower_id = 2,
            following_id = x
        )
        db.session.add(newfollow)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()