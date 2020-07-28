from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.user import bp
# models
from app.models.users.user import User


@bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = list()
    for user in users:
        users_list.append(user.dict())
    users_json = jsonify(users_list)
    return users_json, 200


@bp.route('/<int:_id>', methods=['GET'])
def get_user(_id):
    user = User.query.get(_id)
    if user is None:
        return "User with id={id} not found".format(id=_id), 404
    user_json = jsonify(user.dict())
    return user_json, 200


@bp.route('/<int:_id>', methods=['PUT'])
def update_user(_id):
    user = User.query.get(_id)
    user.username = request.json.get('username', user.dict()["username"])
    user.email = request.json.get('email', user.dict()["email"])
    user.country_id = request.json.get('country', user.dict()["country"])
    db.session.commit()
    return "", 204


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_user(_id):
    user = User.query.get(_id)
    db.session.delete(user)
    db.session.commit()
    return "", 204
