import pytest

from app import create_app, db, fake
from app.models.users.user import User
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

    country1 = Country(name="Testina")
    db.session.add(country1)
    country2 = Country(name="Tested states")
    db.session.add(country2)
    country3 = Country(name="Testistan")
    db.session.add(country3)
    db.session.commit()

    user1 = User(
        username="userTester",
        birthdate="1990-03-13",
        email="userTester@gmail.com",
        country_id="1",
    )
    user1.set_password("testPassword")
    db.session.add(user1)
    user2 = User(
        username="userTester2",
        birthdate="1998-06-22",
        email="userTester2@gmail.com",
        country_id="2",
    )
    user2.set_password("testPass2")
    db.session.add(user2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_users(test_client, init_database):
    response = test_client.get("/user", follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_user(test_client, init_database):
    response = test_client.get("/user/1")
    assert response.status_code == 200
    assert response.json["username"] == "userTester"
    assert response.json["birthdate"] == "1990-03-13"
    assert response.json["email"] == "userTester@gmail.com"
    assert response.json["country"]["id"] == 1


def test_get_specific_user_with_nonexistent_id(test_client, init_database):
    response = test_client.get("/user/100")
    assert response.status_code == 400


def test_update_all_user_fields(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    about_me_text = fake.text(200)
    data = {
        "username": "newUsername",
        "email": "newEmail@gmail.com",
        "birthdate": "1973-01-01",
        "country_id": "2",
        "about_me": about_me_text,
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["username"] == "newUsername"
    assert response.json["email"] == "newEmail@gmail.com"
    assert response.json["birthdate"] == "1973-01-01"
    assert response.json["country"]["id"] == 2
    assert response.json["about_me"] == about_me_text


def test_update_user_username(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"username": "newUsernameTest1"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["username"] == "newUsernameTest1"


def test_update_user_email(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"email": "newEmailtest2@gmail.com"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["email"] == "newEmailtest2@gmail.com"


def test_update_user_birthdate(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"birthdate": "1986-01-01"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["birthdate"] == "1986-01-01"


def test_update_user_country(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"country_id": "3"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["country"]["id"] == 3


def test_update_user_onboarded_to_true(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"onboarded": "True"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["onboarded"] is True


def test_update_user_onboarded_to_false(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"onboarded": "False"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["onboarded"] is False


def test_update_user_about_me(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    about_me_text = fake.text(400)
    data = {"about_me": about_me_text}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["about_me"] == about_me_text


def test_update_user_nonexistant_id(test_client, init_database):
    data = {
        "username": "newUsername",
        "email": "newEmail@gmail.com",
        "country_id": "12",
    }
    response = test_client.put("/user/100", json=data)
    assert response.status_code == 400


def test_update_user_username_exists(test_client, init_database):
    users = User.query.all()
    url = "/user/" + str(users[0].id)
    data = {"username": users[1].username}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_username_is_empty(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"username": ""}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_email_exists(test_client, init_database):
    users = User.query.all()
    url = "/user/" + str(users[0].id)
    data = {"email": users[1].email}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_user_email_is_empty(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    data = {"email": ""}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_delete_user(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert User.query.get(user.id) is None


def test_delete_nonexistent_user(test_client, init_database):
    user_id = 100
    url = "/user/" + str(user_id)
    response = test_client.delete(url)
    assert response.status_code == 400
    assert User.query.get(user_id) is None
