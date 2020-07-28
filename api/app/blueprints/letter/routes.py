import datetime

from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.letter import bp
# models
from app.models.letters.letter import Letter


@bp.route('/', methods=['GET'])
def get_letters():
    letters = Letter.query.all()
    letters_list = list()
    for letter in letters:
        letters_list.append(letter.dict())
    letters_json = jsonify(letters_list)
    return letters_json, 200


@bp.route('/<int:_id>', methods=['GET'])
def get_letter(_id):
    letter = Letter.query.get(_id)
    if letter is None:
        return "Letter with id={id} not found".format(id=_id), 404
    letter_json = jsonify(letter.dict())
    return letter_json, 200


@bp.route('', methods=['POST'])
def create_letter():
    body = request.get_json()
    sent_datetime = datetime.datetime.now(datetime.timezone.utc)
    letter = Letter(text=body["text"], sent_date=sent_datetime,
                    penpal_id=body["penpal_id"], penpal=body["penpal"],
                    user_id=body["user_id"], user=body["user"])
    db.session.add(letter)
    db.session.commit()
    return "Letter with id={id} created".format(id=letter.id), 201


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_letter(_id):
    letter = Letter.query.get(_id)
    db.session.delete(letter)
    db.session.commit()
    return "", 204
