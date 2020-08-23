from flask import jsonify, make_response
from app.blueprints.user import bp

from app.crud import user
from app.schemas.user import user_schema, users_schema


@bp.route("/", methods=["GET"])
def get_users():
    users = user.read_users()
    return jsonify(users_schema.dump(users))


@bp.route("/<int:_id>", methods=["GET"])
def get_user(_id):
    try:
        _user = user.read_user(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)


@bp.route("/<int:_id>", methods=["PUT"])
def put_user(_id):
    try:
        _user = user.update_user(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_user(_id):
    try:
        user.delete_user(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
