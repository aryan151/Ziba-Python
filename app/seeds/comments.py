from app.models import db, Comment
from datetime import datetime
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

def seed_comments():

    for i in range(1,500):
        newComment = Comment(
            user_id = randint(1,28), 
            post_id = randint(1,250), 
            body = fake.text(max_nb_chars=20), 
            createdAt=datetime.now() 
        )
        db.session.add(newComment)     


    db.session.commit() 
   

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()