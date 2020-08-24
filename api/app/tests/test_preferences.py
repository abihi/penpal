import pytest

from app import db
from app.models.preferences.preference import Preference


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    preference1 = Preference(
        gender="Female",
        looking_for="test test test",
        connection_type="Deep connection",
        communication_type="Instant chat",
        interest_type="Similar",
        language_preference="Swedish, English",
    )
    db.session.add(preference1)
    preference2 = Preference(
        gender="Male",
        looking_for="test test test",
        connection_type="Superficial",
        communication_type="Snail mail",
        interest_type="Similar",
        language_preference="English",
    )
    db.session.add(preference2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_specific_preference(test_client, init_database):
    response = test_client.get("/preference/1")
    assert response.status_code == 200
    assert response.json["gender"] == "Female"
    assert response.json["looking_for"] == "test test test"
    assert response.json["connection_type"] == "Deep connection"
    assert response.json["communication_type"] == "Instant chat"
    assert response.json["interest_type"] == "Similar"
    assert response.json["language_preference"] == "Swedish, English"


def test_get_specific_preference_with_nonexistent_id(test_client, init_database):
    response = test_client.get("/preference/100")
    assert response.status_code == 400


def test_create_preference(test_client, init_database):
    data = {
        "gender": "newGender",
        "looking_for": "newLookingFortext",
        "connection_type": "newConn",
        "communication_type": "newComm",
        "interest_type": "newInterestType",
        "language_preference": "newLanguagePreference",
    }
    response = test_client.post("/preference", json=data)
    assert response.status_code == 201
    assert response.json["gender"] == "newGender"
    assert response.json["looking_for"] == "newLookingFortext"
    assert response.json["connection_type"] == "newConn"
    assert response.json["communication_type"] == "newComm"
    assert response.json["interest_type"] == "newInterestType"
    assert response.json["language_preference"] == "newLanguagePreference"


def test_update_preference(test_client, init_database):
    preference = Preference.query.all()[1]
    url = "/preference/" + str(preference.id)
    data = {
        "gender": "updateGender",
        "looking_for": "updateLookingFortext",
        "connection_type": "updateConn",
        "communication_type": "updateComm",
        "interest_type": "updateInterestType",
        "language_preference": "updateLanguagePreference",
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["gender"] == "updateGender"
    assert response.json["looking_for"] == "updateLookingFortext"
    assert response.json["connection_type"] == "updateConn"
    assert response.json["communication_type"] == "updateComm"
    assert response.json["interest_type"] == "updateInterestType"
    assert response.json["language_preference"] == "updateLanguagePreference"


def test_update_preference_with_nonexistant_id(test_client, init_database):
    data = {"name": "newPreference"}
    response = test_client.put("/preference/100", json=data)
    assert response.status_code == 400


def test_delete_preference(test_client, init_database):
    preference = Preference.query.all()[0]
    url = "/preference/" + str(preference.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Preference.query.get(preference.id) is None


def test_delete_nonexistent_preference(test_client, init_database):
    preference_id = 100
    url = "/preference/" + str(preference_id)
    response = test_client.delete(url)
    assert response.status_code == 400
    assert Preference.query.get(preference_id) is None
