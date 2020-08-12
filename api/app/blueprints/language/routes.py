from flask import jsonify, request, make_response
from sqlalchemy import exc

# app dependencies
from app import db
from app.blueprints.language import bp

# models
from app.models.languages.language import Language


@bp.route("/", methods=["GET"])
def get_languages():
    languages = Language.query.all()
    languages_list = list()
    for language in languages:
        languages_list.append(language.dict())
    languages_json = jsonify(languages_list)
    return languages_json, 200


@bp.route("/<int:_id>", methods=["GET"])
def get_language(_id):
    language = Language.query.get(_id)
    if language is None:
        return "Language with id={id} not found".format(id=_id), 404
    language_json = jsonify(language.dict())
    return language_json, 200


@bp.route("", methods=["POST"])
def create_language():
    try:
        language = Language(name=request.json.get("name"))
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    db.session.add(language)
    db.session.commit()
    return make_response(jsonify(language.dict()), 201)


@bp.route("/<int:_id>", methods=["PUT"])
def update_language(_id):
    language = Language.query.get(_id)
    if language is None:
        return "Language with id={id} not found".format(id=_id), 404
    try:
        language.name = request.json.get("name", language.dict()["name"])
        db.session.commit()
        return make_response(jsonify(language.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_language(_id):
    try:
        language = Language.query.get(_id)
        if language is None:
            return make_response("Language with id={id} not found".format(id=_id), 404)
        db.session.delete(language)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
