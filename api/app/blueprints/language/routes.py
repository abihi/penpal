from flask import jsonify, make_response

from app.crud import language
from app.blueprints.language import bp
from app.schemas.language import language_schema, languages_schema


@bp.route("/", methods=["GET"])
def get_languages():
    languages = language.read_languages()
    return jsonify(languages_schema.dump(languages))


@bp.route("/<int:_id>", methods=["GET"])
def get_language(_id):
    try:
        _language = language.read_language(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return language_schema.dump(_language)


@bp.route("", methods=["POST"])
def post_language():
    try:
        _language = language.create_language()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return language_schema.dump(_language), 201


@bp.route("/<int:_id>", methods=["PUT"])
def put_language(_id):
    try:
        _language = language.update_language(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return language_schema.dump(_language)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_language(_id):
    try:
        language.delete_language(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
