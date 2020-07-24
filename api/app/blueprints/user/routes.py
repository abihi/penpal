from flask import jsonify
# app dependencies
from app import db
from app.blueprints.user import bp
# models
from app.models.users.user import User


@bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    user_json = jsonify(user.dict())
    return user_json

@bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    users_dict = {}
    for user in users:
        users_dict[user.dict()["username"]] = user.dict()
    users_json = jsonify(users_dict)
    return users_json
