import pytest

from app import db
from app.models.users.user import User
from app.models.countries.country import Country
from app.models.interests.interest import Interest


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    country1 = Country(name="TestCountry")
    db.session.add(country1)
    db.session.commit()

    interest1 = Interest(
        activity="testInterest1", interest_class="General", interest_type="Outdoors"
    )
    db.session.add(interest1)
    interest2 = Interest(
        activity="testInterest2", interest_class="Collection", interest_type="Indoors"
    )
    db.session.add(interest2)
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


def test_like_and_unlike_interest(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id) + "/like"
    data = {
        "interest_id": "1",
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["interests"][0]["activity"] == "testInterest1"

    url = "/user/" + str(user.id) + "/unlike"
    data = {
        "interest_id": "1",
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["interests"] == []


def test_like_interests_as_user(test_client, init_database):
    user = User.query.all()[0]
    url = "/user/" + str(user.id) + "/like"
    data = {
        "interest_id": "1",
    }
    response = test_client.put(url, json=data)
    data = {
        "interest_id": "2",
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["interests"][0]["activity"] == "testInterest1"
    assert response.json["interests"][1]["activity"] == "testInterest2"
