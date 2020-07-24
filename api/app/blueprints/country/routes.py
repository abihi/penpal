from flask import jsonify, request
# app dependencies
from app import db
from app.blueprints.country import bp
# models
from app.models.countries.country import Country


@bp.route('/', methods=['GET'])
def get_countries():
    countries = Country.query.all()
    countries_dict = {}
    for country in countries:
        countries_dict["country" + str(country.dict()["id"])] = country.dict()
    countries_json = jsonify(countries_dict)
    return countries_json, 200


@bp.route('/<int:id>', methods=['GET'])
def get_country(id):
    country = Country.query.get(id)
    if country is None:
        return "Country with id={id} not found".format(id=id), 404
    country_json = jsonify(country.dict())
    return country_json, 200


@bp.route('', methods=['POST'])
def create_country():
    country = Country(name=request.json.get('name'))
    db.session.add(country)
    db.session.commit()
    return "Country {name} created".format(name=country.name), 201


@bp.route('/<int:id>', methods=['DELETE'])
def delete_country(id):
    country = Country.query.get(id)
    db.session.delete(country)
    db.session.commit()
    return "", 204
