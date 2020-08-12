from flask import jsonify
from sqlalchemy import func

# app dependencies
from app.blueprints.recommendation import bp

# models
from app.models.users.user import User
from app.models.interests.interest import Interest


@bp.route("/users", methods=["GET"])
def get_user_recommendations():
    recommendations = User.query.order_by(func.random()).limit(10)
    if recommendations is None:
        return "No users found", 400
    recommendations_list = list()
    for recommendation in recommendations:
        recommendations_list.append(recommendation.dict())
    recommendations_json = jsonify(recommendations_list)
    return recommendations_json, 200


@bp.route("/interests", methods=["GET"])
def get_interest_recommendations(_id):
    recommendations = Interest.query.order_by(func.random()).limit(10)
    if recommendations is None:
        return "No interests found", 400
    recommendations_list = list()
    for recommendation in recommendations:
        recommendations_list.append(recommendation.dict())
    recommendations_json = jsonify(recommendations_list)
    return recommendations_json, 200
