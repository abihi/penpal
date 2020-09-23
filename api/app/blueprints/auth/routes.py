import validators
from email_validator import validate_email, EmailNotValidError

from flask import jsonify, request, make_response
from flask_login import current_user, login_user, logout_user

from app import login_manager
from app.blueprints.auth import bp

from app.crud.user import create_user
from app.models.users.user import User


@login_manager.user_loader
def load_user(_id):
    if current_user.is_authenticated():
        return User.query.get(_id)
    return None


@bp.route("/", methods=["GET"])
def auth():
    data = {
        "current_user": current_user.get_id(),
        "is_anonymous": current_user.is_anonymous,
        "is_active": current_user.is_active,
        "is_authenticated": current_user.is_authenticated,
    }
    return make_response(jsonify(data), 200)


@bp.route("/login", methods=["GET", "POST"])
def login():
    body = request.get_json()
    if current_user.is_authenticated:
        return make_response("User is logged in already", 200)
    user = User.query.filter_by(username=body["username"]).first()
    if user is None or not user.check_password(body["password"]):
        return make_response("Invalid username or password", 401)
    login_user(user, remember=body["remember_me_toggle"])
    data = {
        "msg": "User logged in sucessfully",
        "user": user.dict(),
        "current_user": user.get_id(),
        "is_anonymous": user.is_anonymous,
        "is_active": user.is_active,
        "is_authenticated": user.is_authenticated,
    }
    return make_response(jsonify(data), 200)


@bp.route("/logout", methods=["GET"])
def logout():
    logout_user()
    data = {
        "current_user": current_user.get_id(),
        "is_anonymous": current_user.is_anonymous,
        "is_active": current_user.is_active,
        "is_authenticated": current_user.is_authenticated,
    }
    return make_response(jsonify(data), 200)


@bp.route("/register", methods=["POST"])
def register():
    try:
        user = create_user()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    data = {
        "msg": "User created sucessfully",
        "user": user.dict(),
        "current_user": user.get_id(),
        "is_anonymous": user.is_anonymous,
        "is_active": user.is_active,
        "is_authenticated": user.is_authenticated,
    }
    login_user(user)
    return make_response(jsonify(data), 201)


@bp.route("/register/username", methods=["POST"])
def username_validation():
    username = request.json.get("username")
    user = User.query.filter_by(username=username).first()
    if user is not None:
        return make_response("Username already exists", 400)
    return make_response("True", 200)


@bp.route("/register/email", methods=["POST"])
def email_validation():
    email = request.json.get("email")
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return make_response("Email already exists", 400)
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as error:
        return make_response(str(error), 400)
    if not validators.domain(email.split("@")[1]):
        return (
            "Email domain {domain} does not exist".format(domain=email.split("@")[1]),
            400,
        )
    return make_response("True", 200)


@bp.route("/register/password", methods=["POST"])
def password_validation():
    password = request.json.get("password")
    if not validators.length(password, min=6):
        return make_response("Password must be longer than 6 characters", 400)
    return make_response("True", 200)
