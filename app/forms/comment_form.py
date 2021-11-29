from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class AddComment(FlaskForm):
    user_id = IntegerField("User Id", [DataRequired()])
    post_id = IntegerField("Post Id", [DataRequired()])
    body = StringField("Caption", [DataRequired()])

class EditComment(FlaskForm):
    id = IntegerField("Id")
    body = StringField("Caption", [DataRequired()])

class DeleteComment(FlaskForm):
    comment_id = IntegerField("Id")     