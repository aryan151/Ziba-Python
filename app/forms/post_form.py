from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired 


class createPost(FlaskForm):
    caption = StringField("Caption")
    img_url = FileField(validators=[FileRequired()])
    user_id = IntegerField("User Id", [DataRequired()])
    lat = FloatField("Lat")  
    long = FloatField("Long")
    tags = StringField("Tag") 
    user_tags = StringField("User Tag") 


class deletePost(FlaskForm):
    id = IntegerField("Id")


class editPost(FlaskForm): 
    post_id = IntegerField("Post Id", [DataRequired()])
    caption = StringField("Caption")
    user_id = IntegerField("User Id", [DataRequired()])
    lat = FloatField("Lat")  
    long = FloatField("Long")
    tags = StringField("Tag")  
    user_tags = StringField("User Tags")     