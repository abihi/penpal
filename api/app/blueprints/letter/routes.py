from flask import jsonify, make_response

from app.blueprints.letter import bp

from app.crud import letter
from app.schemas.letter import letter_schema, letters_schema


@bp.route("/penpal/<int:_id>", methods=["GET"])
def get_letters_from_penpal(_id):
    try:
        letters = letter.read_letters_from_penpal(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return jsonify(letters_schema.dump(letters))


@bp.route("/<int:_id>", methods=["GET"])
def get_letter(_id):
    try:
        _letter = letter.read_letter(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return letter_schema.dump(_letter)


@bp.route("", methods=["POST"])
def post_letter():
    try:
        _letter = letter.create_letter()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return letter_schema.dump(_letter), 201


@bp.route("/<int:_id>", methods=["PUT"])
def put_letter(_id):
    try:
        _letter = letter.update_letter(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return letter_schema.dump(_letter)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_letter(_id):
    try:
        letter.delete_letter(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
