from flask import jsonify
# app dependencies
from app import db
from app.blueprints.user import bp
# models
from app.models.users.user import User


@bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    user_json = jsonify(user.dict())
    return user_json
