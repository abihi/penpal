import pytest

from app import create_app, db
from app.models.countries.country import Country
from config import TestingConfig


@pytest.fixture(scope="module")
def test_client():
    flask_app = create_app(TestingConfig)
    testing_client = flask_app.test_client()

    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    country1 = Country(name="chad")
    db.session.add(country1)
    country2 = Country(name="Sweden")
    db.session.add(country2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_countrys(test_client, init_database):
    response = test_client.get("/country", follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_country(test_client, init_database):
    response = test_client.get("/country/1")
    assert response.status_code == 200
    assert response.json["name"] == "chad"


def test_get_specific_country_with_nonexistent_id(test_client, init_database):
    response = test_client.get("/country/100")
    assert response.status_code == 404


def test_create_country(test_client, init_database):
    data = {"name": "newlyCreatedCountry"}
    response = test_client.post("/country", json=data)
    assert response.status_code == 201
    assert response.json["name"] == "newlyCreatedCountry"


def test_create_country_name_already_exists(test_client, init_database):
    data = {"name": "newlyCreatedCountry"}
    response = test_client.post("/country", json=data)
    assert response.status_code == 400


def test_update_country_name(test_client, init_database):
    country = Country.query.all()[1]
    url = "/country/" + str(country.id)
    data = {"name": "newCountryName"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["name"] == "newCountryName"


def test_update_country_with_nonexistant_id(test_client, init_database):
    data = {"name": "newCountry"}
    response = test_client.put("/country/100", json=data)
    assert response.status_code == 404


def test_update_country_country_name_exists(test_client, init_database):
    country = Country.query.all()[0]
    url = "/country/" + str(country.id)
    data = {"name": country.name}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_country_country_name_is_empty(test_client, init_database):
    country = Country.query.all()[0]
    url = "/country/" + str(country.id)
    data = {"name": ""}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_delete_country(test_client, init_database):
    country = Country.query.all()[0]
    url = "/country/" + str(country.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Country.query.get(country.id) is None


def test_delete_nonexistent_country(test_client, init_database):
    country_id = 100
    url = "/country/" + str(country_id)
    response = test_client.delete(url)
    assert response.status_code == 404
    assert Country.query.get(country_id) is None
