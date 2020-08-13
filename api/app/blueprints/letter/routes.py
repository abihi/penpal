import time

from flask import jsonify, request, make_response
from sqlalchemy import exc

# app dependencies
from app import db
from app.blueprints.letter import bp

# models
from app.models.users.user import User
from app.models.letters.letter import Letter
from app.models.penpals.penpal import PenPal


@bp.route("/penpal/<int:_id>", methods=["GET"])
def get_letters_from_penpal(_id):
    letters = Letter.query.filter(Letter.penpal_id == _id).all()
    if not letters:
        return "Letter from penpal id={id} not found".format(id=_id), 404
    letters_list = list()
    for letter in letters:
        letters_list.append(letter.dict())
    letters_json = jsonify(letters_list)
    return letters_json, 200


@bp.route("/<int:_id>", methods=["GET"])
def get_letter(_id):
    letter = Letter.query.get(_id)
    if letter is None:
        return "Letter with id={id} not found".format(id=_id), 404
    letter_json = jsonify(letter.dict())
    return letter_json, 200


@bp.route("", methods=["POST"])
def create_letter():
    body = request.get_json()
    try:
        letter = Letter(
            text=body["text"],
            sent_date=time.time(),
            penpal_id=body["penpal_id"],
            user_id=body["user_id"],
            penpal=PenPal.query.get(body["penpal_id"]),
            user=User.query.get(body["user_id"]),
        )
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    try:
        db.session.add(letter)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return make_response(jsonify(letter.dict()), 201)


@bp.route("/<int:_id>", methods=["PUT"])
def update_letter(_id):
    letter = Letter.query.get(_id)
    if letter is None:
        return "Letter with id={id} not found".format(id=_id), 404
    try:
        if "text" in request.json:
            letter.text = request.json["text"]
        letter.edited_date = time.time()
        db.session.commit()
        return make_response(jsonify(letter.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_letter(_id):
    try:
        letter = Letter.query.get(_id)
        if letter is None:
            return "Letter with id={id} not found".format(id=_id), 404
        db.session.delete(letter)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
