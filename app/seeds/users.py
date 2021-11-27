from app.models import db, User
from faker import Faker

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        f_name = 'De',
        l_name = 'Mo',
        avatar=fake.image_url(),
        bio = 'test bio',
        user_tags = [5,7,8],
        saved = [7,9,10],
        email='demo@aa.io',  
        password='password') 

 
    follow1 = User(
        username='marnie',
        f_name = 'follow1',
        l_name = 'Nie',
        avatar=fake.image_url(),
        private = True,
        saved = [5,6,7], 
        user_tags = [2,3], 
        email='marnie@aa.io', 
        password='password')


    follow2 = User(
        username='bobbie1',
        f_name = 'follow2',
        avatar=fake.image_url(),
        l_name = 'Bie',
        email='bobbie@aa.io',
        password='password')


    Notfollow1 = User(
        username='bobbie2',
        f_name = 'Notfollow1',
        avatar=fake.image_url(),
        l_name = 'Bie',
        email='bobbie11@aa.io',
        password='password')


    Notfollow2 = User(
        username='bobbie3',
        f_name = 'Notfollow2',
        avatar=fake.image_url(),
        l_name = 'Bie',
        email='bobbie55@aa.io',
        password='password')


    Notfollow3 = User(
        username='bobbie4', 
        f_name = 'Notfollow3',
        avatar=fake.image_url(),
        l_name = 'Bie',
        email='bobbie88@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(follow1)
    db.session.add(follow2) 
    db.session.add(Notfollow1) 
    db.session.add(Notfollow2) 
    db.session.add(Notfollow3)    





    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
