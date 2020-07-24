from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.user import bp
# models
from app.models.users.user import User


@bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    users_dict = {}
    for user in users:
        users_dict["User" + str(user.dict()["id"])] = user.dict()
    users_json = jsonify(users_dict)
    return users_json, 200


@bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return "User with id={id} not found".format(id=id), 404 
    user_json = jsonify(user.dict())
    return user_json, 200


@bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    user.username = request.json.get('username', user.dict()["username"])
    user.email = request.json.get('email', user.dict()["email"])
    user.country_of_origin_id = request.json.get('country_of_origin',
                                                 user.dict()["country_of_origin"])
    user.country_of_recidency_id = request.json.get('country_of_recidency',
                                                    user.dict()["country_of_recidency"])
    db.session.commit()
    return "", 204


@bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return "", 204
