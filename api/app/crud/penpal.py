import time
from flask import request

from app import db
from app.models.penpals.penpal import PenPal


def read_penpals():
    return PenPal.query.all()


def read_penpal(_id):
    penpal = PenPal.query.get(_id)
    if penpal is None:
        raise AssertionError("PenPal with id={id} not found".format(id=_id))
    return penpal


def create_penpal():
    penpal = PenPal(created_date=time.time())
    db.session.add(penpal)
    db.session.commit()
    return penpal


def update_penpal(_id):
    penpal = PenPal.query.get(_id)
    if penpal is None:
        raise AssertionError("PenPal with id={id} not found".format(id=_id))
    penpal.name = request.json.get("name", penpal.name)
    db.session.commit()
    return penpal


def delete_penpal(_id):
    penpal = PenPal.query.get(_id)
    if penpal is None:
        raise AssertionError("PenPal with id={id} not found".format(id=_id))
    db.session.delete(penpal)
    db.session.commit()
