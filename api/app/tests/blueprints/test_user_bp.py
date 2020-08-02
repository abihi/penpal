import pytest

from app import create_app, db
from app.models.users.user import User
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

    user1 = User(username="testsson", email='test@gmail.com', country_id="44")
    user1.set_password('testPassword')
    db.session.add(user1)
    user2 = User(username="test2", email='test2@gmail.com', country_id="42")
    user2.set_password('testPass2')
    db.session.add(user2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_users(test_client, init_database):
    response = test_client.get('/user', follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_user(test_client, init_database):
    response = test_client.get('/user/1')
    assert response.status_code == 200
    assert response.json["username"] == "testsson"
    assert response.json["email"] == "test@gmail.com"
    assert response.json["country"] == 44


def test_get_specific_user_with_nonexistent_id(test_client, init_database):
    response = test_client.get('/user/100')
    assert response.status_code == 404


def test_update_user(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    data = {
        "username": "newUsername",
        "email": "newEmail@gmail.com",
        "country": "12"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["username"] == "newUsername"
    assert response.json["email"] == "newEmail@gmail.com"
    assert response.json["country"] == 12


def test_update_user_nonexistant_id(test_client, init_database):
    data = {
        "username": "newUsername",
        "email": "newEmail@gmail.com",
        "country": "12"
    }
    response = test_client.put('/user/100', json=data)
    assert response.status_code == 404


def test_update_user_username_exists(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    data = {
        "username": user.username,
        "email": "newEmailDontexists@gmail.com",
        "country": "12"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_username_is_empty(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    data = {
        "username": "",
        "email": "newEmailDontexists@gmail.com",
        "country": "12"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_email_exists(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    data = {
        "username": "UsernameDontExist",
        "email": user.email,
        "country": "12"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_email_is_empty(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    data = {
        "username": "UsernameDontExist",
        "email": "",
        "country": "12"
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_delete_user(test_client, init_database):
    user = User.query.all()[0]
    url = '/user/' + str(user.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert User.query.get(user.id) is None


def test_delete_nonexistent_user(test_client, init_database):
    user_id = 100
    url = '/user/' + str(user_id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert User.query.get(user_id) is None
