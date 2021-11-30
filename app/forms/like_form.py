from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class CreateLike(FlaskForm):
    user_id = IntegerField("Liking User Id", [DataRequired()])
    post_id = IntegerField("Post Id", [DataRequired()])


class DestroyLike(FlaskForm):
    like_id = IntegerField("Id")   