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


@bp.route("/<int:_id>/interest/like", methods=["PUT"])
def like_interest(_id):
    try:
        _user = user.like_interest(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)


@bp.route("/<int:_id>/interest/unlike", methods=["PUT"])
def unlike_interest(_id):
    try:
        _user = user.unlike_interest(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)


@bp.route("/<int:_id>/language/add", methods=["PUT"])
def add_languages(_id):
    try:
        _user = user.add_languages(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)


@bp.route("/<int:_id>/language/remove", methods=["PUT"])
def remove_languages(_id):
    try:
        _user = user.remove_language(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return user_schema.dump(_user)
