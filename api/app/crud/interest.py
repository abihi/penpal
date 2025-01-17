from flask import request

from app import db
from app.models.interests.interest import Interest


def read_interests():
    return Interest.query.all()


def read_interest(_id):
    interest = Interest.query.get(_id)
    if interest is None:
        raise AssertionError("Interest with id={id} not found".format(id=_id))
    return interest


def create_interest():
    interest = Interest()
    interest.from_dict(request.get_json())
    db.session.add(interest)
    db.session.commit()
    return interest


def update_interest(_id):
    interest = Interest.query.get(_id)
    if interest is None:
        raise AssertionError("Interest with id={id} not found".format(id=_id))
    interest.from_dict(request.get_json())
    db.session.commit()
    return interest


def delete_interest(_id):
    interest = Interest.query.get(_id)
    if interest is None:
        raise AssertionError("Interest with id={id} not found".format(id=_id))
    db.session.delete(interest)
    db.session.commit()
