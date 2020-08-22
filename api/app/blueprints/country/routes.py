from flask import jsonify, make_response

from app.crud import country
from app.blueprints.country import bp
from app.schemas.country import country_schema, countries_schema


@bp.route("/", methods=["GET"])
def get_countries():
    countries = country.read_countries()
    return jsonify(countries_schema.dump(countries))


@bp.route("/<int:_id>", methods=["GET"])
def get_country(_id):
    _country = country.read_country(_id)
    if _country is None:
        return "Country with id={id} not found".format(id=_id), 404
    return country_schema.dump(_country)


@bp.route("", methods=["POST"])
def post_country():
    try:
        _country = country.create_country()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return country_schema.dump(_country)


@bp.route("/<int:_id>", methods=["PUT"])
def put_country(_id):
    try:
        _country = country.update_country(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return country_schema.dump(_country)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_country(_id):
    try:
        country.delete_country(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
