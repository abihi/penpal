from flask import jsonify, make_response
from app.blueprints.preference import bp

from app.crud import preference
from app.schemas.preference import preference_schema


@bp.route("/<int:_id>", methods=["GET"])
def get_preference(_id):
    try:
        _preference = preference.read_preference(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return preference_schema.dump(_preference)


@bp.route("", methods=["POST"])
def post_preference():
    try:
        _preference = preference.create_preference()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return preference_schema.dump(_preference), 201


@bp.route("/<int:_id>", methods=["PUT"])
def put_preference(_id):
    try:
        _preference = preference.update_preference(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return preference_schema.dump(_preference)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_preference(_id):
    try:
        preference.delete_preference(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
