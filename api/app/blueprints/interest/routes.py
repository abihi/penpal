from flask import jsonify, make_response

from app.crud import interest
from app.blueprints.interest import bp
from app.schemas.interest import interest_schema, interests_schema


@bp.route("/", methods=["GET"])
def get_interests():
    interests = interest.read_interests()
    return jsonify(interests_schema.dump(interests))


@bp.route("/<int:_id>", methods=["GET"])
def get_interest(_id):
    try:
        _interest = interest.read_interest(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return interest_schema.dump(_interest)


@bp.route("", methods=["POST"])
def post_interest():
    try:
        _interest = interest.create_interest()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return interest_schema.dump(_interest), 201


@bp.route("/<int:_id>", methods=["PUT"])
def put_interest(_id):
    try:
        _interest = interest.update_interest(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return interest_schema.dump(_interest)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_interest(_id):
    try:
        interest.delete_interest(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
