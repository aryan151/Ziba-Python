from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField
from wtforms.fields.core import IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileRequired
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def user_exists_edit(form, field):
    # Checking if user exists
    email = field.data
    userFromId = User.query.filter(User.id == form.data["id"]).first().email
    user = User.query.filter(User.email == email).first()
    if not user.email == userFromId:
      if user:
          raise ValidationError('Email address is already in use.')
def password_matches(form, field):
    # Checking if password matches
    old_password = field.data
    id = form.data['id']
    user = User.query.filter(User.id == id).first()

    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(old_password):
        raise ValidationError('Password was incorrect.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    f_name = StringField('First Name', validators=[DataRequired()])
    l_name = StringField('Last Name', validators=[DataRequired()])
    bio = TextAreaField('Bio')
    avatar = FileField('avatar')
    password = StringField('password', validators=[DataRequired()])

class ProfileEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    username = StringField('username', validators=[user_exists_edit]) 
    email = StringField('email', validators=[user_exists_edit])
    f_name = StringField('fname', validators=[DataRequired()])
    l_name = StringField('lname', validators=[DataRequired()])
    bio = TextAreaField('bio')
    old_password = StringField('old_password', validators=[DataRequired(), password_matches])
    password = StringField('password')
    avatar = FileField('avatar')

class EditAvatar(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    avatar = FileField('avatar') 