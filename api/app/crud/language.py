from flask import request

from app import db
from app.models.languages.language import Language


def read_languages():
    return Language.query.all()


def read_language(_id):
    language = Language.query.get(_id)
    if language is None:
        raise AssertionError("Language with id={id} not found".format(id=_id))
    return language


def create_language():
    language = Language(name=request.json.get("name"))
    db.session.add(language)
    db.session.commit()
    return language


def update_language(_id):
    language = Language.query.get(_id)
    if language is None:
        raise AssertionError("Language with id={id} not found".format(id=_id))
    language.name = request.json.get("name", language.name)
    db.session.commit()
    return language


def delete_language(_id):
    language = Language.query.get(_id)
    if language is None:
        raise AssertionError("Language with id={id} not found".format(id=_id))
    db.session.delete(language)
    db.session.commit()
