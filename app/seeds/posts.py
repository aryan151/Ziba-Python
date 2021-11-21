from app.models import db, Post
from datetime import datetime       


def seed_posts():     

    post1 = Post(user_id=1, 
    img_url='https://i.imgur.com/Xulubox.jpeg',  
    caption='setstsestsetest', 
    tags = ['firsttag', 'second tag'],
    createdAt=datetime.now())
    
    post2 = Post(user_id=1,  
    img_url='https://i.imgur.com/QguApMA.jpeg', 
    caption='setstststest',
    createdAt=datetime.now())
    
    post3 = Post(user_id=1,  
    img_url='https://i.imgur.com/IVyU5Im.jpeg',
    caption='setststsetst',
    tags = ['firsttag', 'second tag'],
    createdAt=datetime.now())

    post4 = Post(user_id=1, 
    img_url='https://i.imgur.com/X92aA5Y.jpeg', 
    caption='setstsetststs', 
    tags = ['firsttag'],
    createdAt=datetime.now())
    
    post5 = Post(user_id=1, 
    img_url='https://i.imgur.com/XqJH9vD.jpeg', 
    caption='setststsetst',
    tags = ['firsttag'],
    createdAt=datetime.now())
    
    post6 = Post(user_id=3,
    img_url='https://i.imgur.com/IVefonq.jpeg',
    caption='setststest',
    createdAt=datetime.now())  
    
    post7 = Post(user_id=4, 
    img_url='https://i.imgur.com/PnSeZX3.jpeg', 
    caption='setstestst', 
    createdAt=datetime.now())
    
    post8 = Post(user_id=5, 
    img_url='https://i.imgur.com/JHHx0AD.jpeg', 
    caption='setstestest',
    createdAt=datetime.now())
       
    post9 = Post(user_id=2,
    img_url='https://i.imgur.com/gjEZAJ7.jpeg',
    caption='setststsets',
    tags = ['firsttag', 'second tag'],
    createdAt=datetime.now())
    
    post10 = Post(user_id=3, 
    img_url='https://i.imgur.com/yxovJ4S.jpeg', 
    caption='setstsetst', 
    createdAt=datetime.now())
    
    post11 = Post(user_id=2, 
    img_url='https://i.imgur.com/tXtwrPd.jpeg', 
    caption='etsttests',
    tags = ['firsttag', 'second tag'],
    createdAt=datetime.now())
    
    post12 = Post(user_id=2,
    img_url='https://i.imgur.com/Pboz5mG.jpeg',
    caption='test',  
    createdAt=datetime.now())


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)

 
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()