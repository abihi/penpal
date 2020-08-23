import time
from flask import request

from app import db
from app.models.users.user import User
from app.models.letters.letter import Letter
from app.models.penpals.penpal import PenPal


def read_letters_from_penpal(_id):
    letters = Letter.query.filter(Letter.penpal_id == _id).all()
    if not letters:
        raise AssertionError("Letter from penpal id={id} not found".format(id=_id))
    return letters


def read_letter(_id):
    letter = Letter.query.get(_id)
    if not letter:
        raise AssertionError("letter with id={id} not found".format(id=_id))
    return letter


def create_letter():
    body = request.get_json()
    letter = Letter(
        text=body["text"],
        sent_date=time.time(),
        penpal_id=body["penpal_id"],
        user_id=body["user_id"],
        penpal=PenPal.query.get(body["penpal_id"]),
        user=User.query.get(body["user_id"]),
    )
    db.session.add(letter)
    db.session.commit()
    return letter


def update_letter(_id):
    letter = Letter.query.get(_id)
    if letter is None:
        raise AssertionError("Letter with id={id} not found".format(id=_id))
    if "text" in request.json:
        letter.text = request.json["text"]
        letter.edited_date = time.time()
    db.session.commit()
    return letter


def delete_letter(_id):
    letter = Letter.query.get(_id)
    if letter is None:
        raise AssertionError("Letter with id={id} not found".format(id=_id))
    db.session.delete(letter)
    db.session.commit()
