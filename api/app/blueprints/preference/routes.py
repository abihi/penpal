import time

from flask import jsonify, request, make_response
from sqlalchemy import exc

# app dependencies
from app import db
from app.blueprints.preference import bp

# models
from app.models.preferences.preference import Preference


@bp.route("/<int:_id>", methods=["GET"])
def get_preference(_id):
    preference = Preference.query.get(_id)
    if preference is None:
        return "Preference with id={id} not found".format(id=_id), 404
    preference_json = jsonify(preference.dict())
    return preference_json, 200


@bp.route("", methods=["POST"])
def create_preference():
    preference = Preference(created_date=time.time())
    try:
        db.session.add(preference)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "Preference with id={id} created".format(id=preference.id), 201


@bp.route("/<int:_id>", methods=["PUT"])
def update_preference(_id):
    preference = Preference.query.get(_id)
    if preference is None:
        return make_response("Preference with id={id} not found".format(id=_id), 404)
    body = request.get_json()
    try:
        preference.from_dict(body)
        db.session.commit()
        return make_response(jsonify(preference.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_preference(_id):
    try:
        preference = Preference.query.get(_id)
        if preference is None:
            return make_response(
                "Preference with id={id} not found".format(id=_id), 404
            )
        db.session.delete(preference)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
