import pytest

from app import create_app, db
from app.models.interests.interest import Interest
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

    interest1 = Interest(activity="Sport")
    db.session.add(interest1)
    interest2 = Interest(activity="Sweden")
    db.session.add(interest2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_interests(test_client, init_database):
    response = test_client.get("/interest", follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_interest(test_client, init_database):
    response = test_client.get("/interest/1")
    assert response.status_code == 200
    assert response.json["activity"] == "Sport"


def test_get_specific_interest_with_nonexistent_id(test_client, init_database):
    response = test_client.get("/interest/100")
    assert response.status_code == 404


def test_create_interest(test_client, init_database):
    data = {"activity": "newlyCreatedInterest"}
    response = test_client.post("/interest", json=data)
    assert response.status_code == 201
    assert response.json["activity"] == "newlyCreatedInterest"


def test_create_interest_activity_already_exists(test_client, init_database):
    data = {"activity": "newlyCreatedInterest"}
    response = test_client.post("/interest", json=data)
    assert response.status_code == 400


def test_update_interest_activity(test_client, init_database):
    interest = Interest.query.all()[1]
    url = "/interest/" + str(interest.id)
    data = {"activity": "newInterestActivity"}
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["activity"] == "newInterestActivity"


def test_update_interest_with_nonexistant_id(test_client, init_database):
    data = {"activity": "newInterest"}
    response = test_client.put("/interest/100", json=data)
    assert response.status_code == 404


def test_update_interest_interest_activity_exists(test_client, init_database):
    interest = Interest.query.all()[0]
    url = "/interest/" + str(interest.id)
    data = {"activity": interest.activity}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_update_interest_interest_activity_is_empty(test_client, init_database):
    interest = Interest.query.all()[0]
    url = "/interest/" + str(interest.id)
    data = {"activity": ""}
    response = test_client.put(url, json=data)
    assert response.status_code == 400


def test_delete_interest(test_client, init_database):
    interest = Interest.query.all()[0]
    url = "/interest/" + str(interest.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Interest.query.get(interest.id) is None


def test_delete_nonexistent_interest(test_client, init_database):
    interest_id = 100
    url = "/interest/" + str(interest_id)
    response = test_client.delete(url)
    assert response.status_code == 404
    assert Interest.query.get(interest_id) is None
