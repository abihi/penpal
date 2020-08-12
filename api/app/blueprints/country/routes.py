from flask import jsonify, request, make_response
from sqlalchemy import exc

# app dependencies
from app import db
from app.blueprints.country import bp

# models
from app.models.countries.country import Country


@bp.route("/", methods=["GET"])
def get_countries():
    countries = Country.query.all()
    countries_list = list()
    for country in countries:
        countries_list.append(country.dict())
    countries_json = jsonify(countries_list)
    return countries_json, 200


@bp.route("/<int:_id>", methods=["GET"])
def get_country(_id):
    country = Country.query.get(_id)
    if country is None:
        return "Country with id={id} not found".format(id=_id), 404
    return make_response(jsonify(country.dict()), 200)


@bp.route("", methods=["POST"])
def create_country():
    try:
        country = Country(name=request.json.get("name"))
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    db.session.add(country)
    db.session.commit()
    return make_response(jsonify(country.dict()), 201)


@bp.route("/<int:_id>", methods=["PUT"])
def update_country(_id):
    country = Country.query.get(_id)
    if country is None:
        return "Country with id={id} not found".format(id=_id), 404
    try:
        country.name = request.json.get("name", country.dict()["name"])
        db.session.commit()
        return make_response(jsonify(country.dict()), 200)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_country(_id):
    try:
        country = Country.query.get(_id)
        if country is None:
            return make_response("Country with id={id} not found".format(id=_id), 404)
        db.session.delete(country)
        db.session.commit()
    except exc.SQLAlchemyError as exception_message:
        make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
