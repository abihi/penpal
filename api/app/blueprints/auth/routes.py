import validators
from email_validator import validate_email, EmailNotValidError

from flask import jsonify, request
from flask_login import current_user, login_user

# app dependencies
from app import db
from app.blueprints.auth import bp
# models
from app.models.users.user import User

@bp.route('/', methods=['GET'])
def auth():
    response = {"current_user": current_user.get_id(),
                "is_anonymous": current_user.is_anonymous,
                "is_active": current_user.is_active,
                "is_authenticated": current_user.is_authenticated}
    response_json = jsonify(response)
    return response_json, 200

@bp.route('/login', methods=['GET', 'POST'])
def login():
    body = request.get_json()
    if current_user.is_authenticated:
        return 'User is logged in already', 200
    user = User.query.filter_by(username=body["username"]).first()
    if user is None or not user.check_password(body["password"]):
        return 'Invalid username or password', 401
    login_user(user, remember=body["rememberMeToggle"])
    response = {"current_user": current_user.get_id(),
                "is_anonymous": current_user.is_anonymous,
                "is_active": current_user.is_active,
                "is_authenticated": current_user.is_authenticated}
    response_json = jsonify(response)
    return response_json, 200


@bp.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    # Check if username is unique
    user = User.query.filter_by(username=body["username"]).first()
    if user is not None:
        return "Username {username} already exists".format(username=body["username"]), 400
    # Validate and verify email
    email = body["email"]
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return "Email {email} already exists".format(email=email), 400
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as error:
        return str(error), 400
    if not validators.domain(email.split('@')[1]):
        return "Email domain {domain} does not exist".format(domain=email.split('@')[1]), 400
    # Check password length
    if not validators.length(body["password"], min=6):
        return "Password must be longer than 6 characters", 400
    # Add user to DB and set password then login user
    user = User(username=body["username"], email=body["email"], country_id=body["country_id"])
    user.set_password(body["password"])
    db.session.add(user)
    db.session.commit()
    login_user(user)
    response = {"current_user": current_user.get_id(),
                "is_anonymous": current_user.is_anonymous,
                "is_active": current_user.is_active,
                "is_authenticated": current_user.is_authenticated}
    response_json = jsonify(response)
    return response_json, 201


@bp.route('/register/username', methods=['POST'])
def username_validation():
    username = request.json.get('username')
    user = User.query.filter_by(username=username).first()
    if user is not None:
        return "Username already exists", 400
    return "True", 200


@bp.route('/register/email', methods=['POST'])
def email_validation():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return "Email already exists", 400
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as error:
        return str(error), 400
    if not validators.domain(email.split('@')[1]):
        return "Email domain {domain} does not exist".format(domain=email.split('@')[1]), 400
    return "True", 200


@bp.route('/register/password', methods=['POST'])
def password_validation():
    password = request.json.get('password')
    if not validators.length(password, min=6):
        return "Password must be longer than 6 characters", 400
    return "True", 200
