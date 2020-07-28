import datetime

from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.penpal import bp
# models
from app.models.penpals.penpal import PenPal


@bp.route('/', methods=['GET'])
def get_penpals():
    penpals = PenPal.query.all()
    penpals_list = list()
    for penpal in penpals:
        penpals_list.append(penpal.dict())
    penpals_json = jsonify(penpals_list)
    return penpals_json, 200


@bp.route('/<int:_id>', methods=['GET'])
def get_penpal(_id):
    penpal = PenPal.query.get(_id)
    if penpal is None:
        return "Penpal with id={id} not found".format(id=_id), 404
    penpal_json = jsonify(penpal.dict())
    return penpal_json, 200


@bp.route('', methods=['POST'])
def create_penpal():
    created_datetime = datetime.datetime.now(datetime.timezone.utc)
    penpal = PenPal(created_date=created_datetime)
    db.session.add(penpal)
    db.session.commit()
    return "Penpal with id={id} created".format(id=penpal.id), 201


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_penpal(_id):
    penpal = PenPal.query.get(_id)
    db.session.delete(penpal)
    db.session.commit()
    return "", 204
