from email_validator import validate_email, EmailNotValidError

from flask import request
from flask_login import current_user, login_user

# app dependencies
from app import db
from app.blueprints.auth import bp
# models
from app.models.users.user import User


@bp.route('/login', methods=['GET', 'POST'])
def login():
    body = request.get_json()
    if current_user.is_authenticated:
        return 'User is logged in already', 200
    user = User.query.filter_by(username=body["username"]).first()
    if user is None or not user.check_password(body["password"]):
        return 'Invalid username or password', 401
    login_user(user, remember=body["remember_me"])
    return 'Login sucessful', 200


@bp.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    user = User(username=body["username"], email=body["email"], country_id=body["country_id"])
    user.set_password(body["password"])
    db.session.add(user)
    db.session.commit()

    return "User created", 201


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
    return "True", 200


@bp.route('/register/password', methods=['POST'])
def password_validation():
    password = request.json.get('password')
    if len(password) <= 6:
        return "Password must be longer than 6 characters", 400
    return "True", 200
