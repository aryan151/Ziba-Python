from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProfileEditForm
from app.forms import EditAvatar 
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

  
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}   


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.data['avatar'] == None:
        url = 'https://zibapython.s3.amazonaws.com/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    else:
        image = form.data['avatar']
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            avatar=url,
            bio=form.data['bio'],
            f_name=form.data['f_name'],  
            l_name=form.data['l_name'],
        )


        db.session.add(user)  
        db.session.commit()
        login_user(user)

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/signup', methods=['PUT'])
def edit_profile():
    """
    Edits existing user
    """
    form = ProfileEditForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    

    user = User.query.filter(User.id == data["id"]).first()
    user_avatar = user.avatar

    if form.data['avatar'] == None:
        url = user_avatar
    else:
        image = form.data['avatar']

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        user.username=form.data['username'] 
        user.email=form.data['email']

        # Checks to see if password changed versus the validated "oldpassword"
        if not data["old_password"] == data["password"] and not data["password"] == "":
          user.password=form.data['password']

        user.avatar=url
        user.bio=form.data['bio']
  
        user.f_name=form.data['fname']
        user.l_name=form.data['lname']


        db.session.commit()

        return user.to_dict(), {'errors': validation_errors_to_error_messages(form.errors)}

   

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/signup/avatar', methods=['PUT'])
def edit_avatar():
    """
    Edits existing user
    """

    form = EditAvatar()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']


    user = User.query.filter(User.id == data["id"]).first()
    user_avatar = user.avatar

    if form.data['avatar'] == None:
        url = user_avatar
    else:
        image = form.data['avatar']

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        user.avatar=url
       
        db.session.commit()

        return user.to_dict(), {'errors': validation_errors_to_error_messages(form.errors)}

    

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
