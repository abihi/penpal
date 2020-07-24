from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.language import bp
# models
from app.models.languages.language import Language


@bp.route('/', methods=['GET'])
def get_languages():
    languages = Language.query.all()
    languages_dict = {}
    for language in languages:
        languages_dict["language" + str(language.dict()["id"])] = language.dict()
    languages_json = jsonify(languages_dict)
    return languages_json, 200


@bp.route('/<int:id>', methods=['GET'])
def get_language(id):
    language = Language.query.get(id)
    if language is None:
        return "Language with id={id} not found".format(id=id), 404
    language_json = jsonify(language.dict())
    return language_json, 200


@bp.route('', methods=['POST'])
def create_language():
    language = Language(name=request.json.get('name'))
    db.session.add(language)
    db.session.commit()
    return "Language {name} created".format(name=language.name), 201


@bp.route('/<int:id>', methods=['DELETE'])
def delete_language(id):
    language = Language.query.get(id)
    db.session.delete(language)
    db.session.commit()
    return "", 204
