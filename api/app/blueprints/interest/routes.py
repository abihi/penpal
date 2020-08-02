from flask import jsonify, request, make_response
from sqlalchemy import exc

# app dependencies
from app import db
from app.blueprints.interest import bp
# models
from app.models.interests.interest import Interest


@bp.route('/', methods=['GET'])
def get_interests():
    interests = Interest.query.all()
    interests_list = list()
    for interest in interests:
        interests_list.append(interest.dict())
    interests_json = jsonify(interests_list)
    return interests_json, 200


@bp.route('/<int:_id>', methods=['GET'])
def get_interest(_id):
    interest = Interest.query.get(_id)
    if interest is None:
        return "Interest with id={id} not found".format(id=_id), 404
    interest_json = jsonify(interest.dict())
    return interest_json, 200


@bp.route('', methods=['POST'])
def create_interest():
    try:
        interest = Interest(activity=request.json.get('activity'))
    except AssertionError as exception_message:
        return make_response(jsonify(msg='Error: {}. '.format(exception_message)), 400)
    db.session.add(interest)
    db.session.commit()
    return make_response(jsonify(interest.dict()), 201)


@bp.route('/<int:_id>', methods=['PUT'])
def update_country(_id):
    interest = Interest.query.get(_id)
    if interest is None:
        return "Interest with id={id} not found".format(id=_id), 404
    try:
        interest.activity = request.json.get('activity', interest.dict()["activity"])
        db.session.commit()
        return make_response(jsonify(interest.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg='Error: {}. '.format(exception_message)), 400)


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_interest(_id):
    try:
        interest = Interest.query.get(_id)
        db.session.delete(interest)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg='Error: {}. '.format(exception_message)), 400)
    return "", 204
