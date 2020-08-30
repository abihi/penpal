import pytest

from app import db
from app.models.users.user import User
from app.models.countries.country import Country
from app.models.languages.language import Language


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    country1 = Country(name="TestCountry")
    db.session.add(country1)
    db.session.commit()

    language1 = Language(name="testLanguage1")
    db.session.add(language1)
    language2 = Language(name="testLanguage2")
    db.session.add(language2)
    db.session.commit()

    user = User(
        username="userTester",
        birthdate="1990-03-13",
        gender="Male",
        about_me="Test Test text",
        email="userTester@gmail.com",
        country_id="1",
    )
    user.set_password("testPassword")
    db.session.add(user)

    db.session.commit()

    yield db

    db.drop_all()


def test_add_and_remove_language(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id) + "/language/add"
    data = {"language_ids": "1"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["languages"][0]["name"] == "testLanguage1"

    url = "/user/" + str(user.id) + "/language/remove"
    data = {"language_id": "1"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["languages"] == []


def test_add_languages_as_user(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id) + "/language/add"
    data = {"language_ids": ["1", "2"]}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["languages"][0]["name"] == "testLanguage1"
    assert response.json["languages"][1]["name"] == "testLanguage2"
