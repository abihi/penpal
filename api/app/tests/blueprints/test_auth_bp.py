import pytest

from app import create_app, db
from app.models.users.user import User
from app.models.countries.country import Country
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

    user1 = User(username="testsson", email='test@gmail.com', country_id="1")
    user1.set_password('testPassword')
    db.session.add(user1)
    user2 = User(username="testare", email='testare@gmail.com', country_id="1")
    user2.set_password('testarePassword')
    db.session.add(user2)
    country1 = Country(name="chad")
    db.session.add(country1)

    db.session.commit()

    yield db

    db.drop_all()


def test_register_user(test_client, init_database):
    data = {
        "username": "newUser",
        "email": "newUser@gmail.com",
        "password": "testPassword",
        "country_id": "1"
    }
    response = test_client.post('/auth/register', json=data)
    assert response.status_code == 201
    assert response.json["username"] == "newUser"
    assert response.json["email"] == "newUser@gmail.com"
    # Logout the recently registred user
    response = test_client.get('/auth/logout')


def test_register_user_where_username_already_exists(test_client, init_database):
    user = User.query.all()[0]
    data = {
        "username": user.username,
        "email": "newUserpassowrd@gmail.com",
        "password": "testPassword",
        "country_id": "1"
    }
    response = test_client.post('/auth/register', json=data)
    assert response.status_code == 400


def test_register_user_where_email_already_exists(test_client, init_database):
    user = User.query.all()[0]
    data = {
        "username": "newUsernameEmail",
        "email": user.email,
        "password": "testPassword",
        "country_id": "1"
    }
    response = test_client.post('/auth/register', json=data)
    assert response.status_code == 400


def test_register_user_with_too_short_password(test_client, init_database):
    data = {
        "username": "newUserpassword",
        "email": "newUserpassowrd@gmail.com",
        "password": "test",
        "country_id": "1"
    }
    response = test_client.post('/auth/register', json=data)
    assert response.status_code == 400


def test_login_and_logout_user_sucessfully(test_client, init_database):
    data = {
        "username": "testsson",
        "password": "testPassword",
        "remember_me_toggle": "True"
    }
    # Assert User logged in sucessfully
    response = test_client.post('/auth/login', json=data)
    assert response.status_code == 200
    # Assert User is logged in already
    response = test_client.get('/auth/login')
    assert response.status_code == 200
    # Assert User is logged out sucessfully
    response = test_client.get('/auth/logout')
    assert response.status_code == 200


def test_login_wrong_username_or_password(test_client, init_database):
    data = {
        "username": "notAUser",
        "password": "testPassword",
        "remember_me_toggle": "True"
    }
    response = test_client.post('/auth/login', json=data)
    assert response.status_code == 401


def test_auth(test_client, init_database):
    response = test_client.get('/auth/')
    assert response.status_code == 200


def test_username_already_exists(test_client, init_database):
    data = {"username": "testsson"}
    response = test_client.post('/auth/register/username', json=data)
    assert response.status_code == 400


def test_with_valid_username(test_client, init_database):
    data = {"username": "usernamedoesnotexist"}
    response = test_client.post('/auth/register/username', json=data)
    assert response.status_code == 200 


def test_email_already_exists(test_client, init_database):
    data = {"email": "test@gmail.com"}
    response = test_client.post('/auth/register/email', json=data)
    assert response.status_code == 400


def test_email_with_missing_at_sign(test_client, init_database):
    data = {"email": "testgmail.com"}
    response = test_client.post('/auth/register/email', json=data)
    assert response.status_code == 400


def test_email_with_missing_dot(test_client, init_database):
    data = {"email": "test@gmailcom"}
    response = test_client.post('/auth/register/email', json=data)
    assert response.status_code == 400


def test_email_invalid_domain(test_client, init_database):
    data = {"email": "test@bihiihi.com"}
    response = test_client.post('/auth/register/email', json=data)
    assert response.status_code == 400


def test_with_valid_email(test_client, init_database):
    data = {"email": "validemail@gmail.com"}
    response = test_client.post('/auth/register/email', json=data)
    assert response.status_code == 200


@pytest.mark.parametrize(
    "email_data, expected_status, expected_data",
    [
        ({"email": "test@gmail.com"}, 400, {}),
        ({"email": "testgmail.com"}, 400, {}),
        ({"email": "test@gmailcom"}, 400, {}),
        ({"email": "test@bihiii.com"}, 400, {}),
        ({"email": "validemail@gmail.com"}, 200, {}),
    ]
)
def test_email_validation(test_client, init_database, email_data, expected_status, expected_data):
    response = test_client.post('/auth/register/email', json=email_data)
    assert response.status_code == expected_status


def test_with_too_short_password(test_client, init_database):
    data = {"password": "test"}
    response = test_client.post('/auth/register/password', json=data)
    assert response.status_code == 400


def test_with_valid_password(test_client, init_database):
    data = {"password": "testPassword"}
    response = test_client.post('/auth/register/password', json=data)
    assert response.status_code == 200
