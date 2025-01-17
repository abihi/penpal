import time
from flask import request

from app import db
from app.models.languages.language import Language
from app.models.preferences.preference import Preference


def read_preferences():
    return Preference.query.all()


def read_preference(_id):
    preference = Preference.query.get(_id)
    if preference is None:
        raise AssertionError("Preference with id={id} not found".format(id=_id))
    return preference


def create_preference():
    preference = Preference()
    preference.from_dict(request.get_json())
    preference.created_date = time.time()
    db.session.add(preference)
    db.session.commit()
    return preference


def update_preference(_id):
    preference = Preference.query.get(_id)
    if preference is None:
        raise AssertionError("Preference with id={id} not found".format(id=_id))
    preference.from_dict(request.get_json())
    db.session.commit()
    return preference


def delete_preference(_id):
    preference = Preference.query.get(_id)
    if preference is None:
        raise AssertionError("Preference with id={id} not found".format(id=_id))
    db.session.delete(preference)
    db.session.commit()


def add_preferred_language(_id):
    body = request.get_json()
    preference = Preference.query.get(_id)
    if preference is None:
        raise AssertionError("Preference with id={id} not found".format(id=_id))
    for language_id in body["language_ids"]:
        language = Language.query.get(language_id)
        preference.preferred_languages.append(language)
    db.session.commit()
    return preference


def remove_preferred_language(_id):
    body = request.get_json()
    preference = Preference.query.get(_id)
    if preference is None:
        raise AssertionError("Preference with id={id} not found".format(id=_id))
    language = Language.query.get(body["language_id"])
    preference.preferred_languages.remove(language)
    db.session.commit()
    return preference
