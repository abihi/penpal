import pytest

from app import create_app, db
from app.models.languages.language import Language
from config import TestingConfig

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app(TestingConfig)
    testing_client = flask_app.test_client()

    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()


@pytest.fixture(scope='module')
def init_database():
    db.create_all()

    language1 = Language(name="Swedish")
    db.session.add(language1)
    language2 = Language(name="English")
    db.session.add(language2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_languages(test_client, init_database):
    response = test_client.get('/language', follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_language(test_client, init_database):
    response = test_client.get('/language/1')
    assert response.status_code == 200
    assert response.json["name"] == "Swedish"


def test_get_specific_language_with_nonexistent_id(test_client, init_database):
    response = test_client.get('/language/100')
    assert response.status_code == 404


def test_create_language(test_client, init_database):
    data = {
        "name": "newlyCreatedLanguage"
    }
    response = test_client.post('/language', json=data)
    assert response.status_code == 201
    assert response.json["name"] == "newlyCreatedLanguage"


def test_create_language_name_already_exists(test_client, init_database):
    data = {
        "name": "newlyCreatedLanguage"
    }
    response = test_client.post('/language', json=data)
    assert response.status_code == 400


def test_update_language(test_client, init_database):
    language = Language.query.all()[1]
    url = '/language/' + str(language.id)
    data = {
        "name": "newLanguage"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["name"] == "newLanguage"


def test_update_language_with_nonexistant_id(test_client, init_database):
    data = {
        "name": "newLanguage"
    }
    response = test_client.put('/language/100', json=data)
    assert response.status_code == 404


def test_update_language_language_name_exists(test_client, init_database):
    language = Language.query.all()[0]
    url = '/language/' + str(language.id)
    data = {
        "name": language.name
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_language_language_name_is_empty(test_client, init_database):
    language = Language.query.all()[0]
    url = '/language/' + str(language.id)
    data = {
        "name": ""
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_delete_language(test_client, init_database):
    language = Language.query.all()[0]
    url = '/language/' + str(language.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Language.query.get(language.id) is None


def test_delete_nonexistent_language(test_client, init_database):
    language_id = 100
    url = '/language/' + str(language_id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Language.query.get(language_id) is None
