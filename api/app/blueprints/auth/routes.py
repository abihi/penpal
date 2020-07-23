import datetime

from flask import jsonify, request, redirect, url_for
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
    login_user(user, remember=body["rememberMeToggle"])
    return 'Login sucessful', 200


@bp.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    user = User(username=body["username"], email=body["email"], country_of_origin_id=int(body["country_of_origin_id"]),
                    country_of_recidency_id=int(body["country_of_recidency_id"]))
    user.set_password(body["password"])
    db.session.add(user)
    db.session.commit()
    return "User created", 200