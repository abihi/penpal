from flask import request

from app import db
from app.models.countries.country import Country


def read_countries():
    return Country.query.all()


def read_country(_id):
    return Country.query.get(_id)


def create_country():
    country = Country(name=request.json.get("name"))
    db.session.add(country)
    db.session.commit()
    return country


def update_country(_id):
    country = Country.query.get(_id)
    if country is None:
        raise AssertionError("Country with id={id} not found".format(id=_id))
    country.name = request.json.get("name", country.name)
    db.session.commit()
    return country


def delete_country(_id):
    country = Country.query.get(_id)
    if country is None:
        raise AssertionError("Country with id={id} not found".format(id=_id))
    db.session.delete(country)
    db.session.commit()
