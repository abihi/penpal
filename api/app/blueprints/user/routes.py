from flask import jsonify, request, make_response
from sqlalchemy import exc

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
    return make_response(jsonify(users_list), 200)


@bp.route('/<int:_id>', methods=['GET'])
def get_user(_id):
    user = User.query.get(_id)
    if user is None:
        return make_response("User with id={id} not found".format(id=_id), 404)
    return make_response(jsonify(user.dict()), 200)


@bp.route('/<int:_id>', methods=['PUT'])
def update_user(_id):
    user = User.query.get(_id)
    if user is None:
        return make_response("User with id={id} not found".format(id=_id), 404)
    try:
        user.username = request.json.get('username', user.dict()["username"])
        user.email = request.json.get('email', user.dict()["email"])
        user.country_id = request.json.get('country', user.dict()["country"])
        db.session.commit()
        return make_response(jsonify(user.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg='Error: {}. '.format(exception_message)), 400)


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_user(_id):
    try:
        user = User.query.get(_id)
        db.session.delete(user)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg='Error: {}. '.format(exception_message)), 400)
    return "", 204
