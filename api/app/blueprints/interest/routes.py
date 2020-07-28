from flask import jsonify, request
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
    interest = Interest(activity=request.json.get('activity'))
    db.session.add(interest)
    db.session.commit()
    return "Interest {activity} created".format(activity=interest.activity), 201


@bp.route('/<int:_id>', methods=['DELETE'])
def delete_interest(_id):
    interest = Interest.query.get(_id)
    db.session.delete(interest)
    db.session.commit()
    return "", 204
