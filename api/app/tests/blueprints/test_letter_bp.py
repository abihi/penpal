import time
import pytest

from app import create_app, db
from app.models.users.user import User
from app.models.letters.letter import Letter
from app.models.penpals.penpal import PenPal
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

    country1 = Country(name="Chad")
    db.session.add(country1)
    country2 = Country(name="Sweden")
    db.session.add(country2)
    db.session.commit()

    user1 = User(username="letterTester", email='letterTester@gmail.com', country_id="1")
    user1.set_password('testPassword')
    db.session.add(user1)
    user2 = User(username="letterTester2", email='letterTester2@gmail.com', country_id="2")
    user2.set_password('testPass2')
    db.session.add(user2)
    db.session.commit()

    penpal1 = PenPal(created_date=time.time())
    db.session.add(penpal1)
    db.session.commit()

    letter1 = Letter(
        text="Hi I'm letterTester", sent_date=time.time(),
        penpal_id=penpal1.id, penpal=penpal1,
        user_id=user1.id, user=user1
    )
    db.session.add(letter1)
    letter2 = Letter(
        text="Hi I'm letterTester2", sent_date=time.time(),
        penpal_id=penpal1.id, penpal=penpal1,
        user_id=user2.id, user=user2
    )
    db.session.add(letter2)
    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_letters_from_penpal(test_client, init_database):
    penpal = PenPal.query.all()[0]
    url = '/letter/penpal/' + str(penpal.id)
    response = test_client.get(url, follow_redirects=True)
    assert response.status_code == 200
    assert response.json[0]['text'] == "Hi I'm letterTester"
    assert response.json[0]["penpal_id"] == 1
    assert response.json[0]["user_id"] == 1
    assert response.json[1]['text'] == "Hi I'm letterTester2"
    assert response.json[1]["penpal_id"] == 1
    assert response.json[1]["user_id"] == 2


def test_get_specific_letter(test_client, init_database):
    response = test_client.get('/letter/2')
    assert response.status_code == 200
    assert response.json["text"] == "Hi I'm letterTester2"
    assert response.json["penpal_id"] == 1
    assert response.json["user_id"] == 2


def test_get_specific_letter_with_nonexistent_id(test_client, init_database):
    response = test_client.get('/letter/100')
    assert response.status_code == 404


def test_create_letter(test_client, init_database):
    sent_time = time.time()
    penpal_id = 1
    user_id = 2
    data = {
        "text": "newlyCreatedLetter",
        "sent_date": sent_time,
        "penpal_id": penpal_id,
        "user_id": user_id,
    }
    response = test_client.post('/letter', json=data)
    assert response.status_code == 201
    assert response.json["text"] == "newlyCreatedLetter"
    assert response.json["sent_date"] == pytest.approx(sent_time, abs=1)
    assert response.json["penpal_id"] == penpal_id
    assert response.json["user_id"] == user_id


def test_create_letter_with_missing_text(test_client, init_database):
    sent_time = time.time()
    penpal_id = 1
    user_id = 2
    data = {
        "text": "",
        "sent_date": sent_time,
        "penpal_id": penpal_id,
        "user_id": user_id,
    }
    response = test_client.post('/letter', json=data)
    assert response.status_code == 400


def test_create_letter_with_missing_penpal_id(test_client, init_database):
    sent_time = time.time()
    user_id = 2
    data = {
        "text": "newlyCreatedLetter",
        "sent_date": sent_time,
        "penpal_id": "",
        "user_id": user_id,
    }
    response = test_client.post('/letter', json=data)
    assert response.status_code == 400


def test_create_letter_with_missing_user_id(test_client, init_database):
    sent_time = time.time()
    penpal_id = 1
    data = {
        "text": "newlyCreatedLetter",
        "sent_date": sent_time,
        "penpal_id": penpal_id,
        "user_id": "",
    }
    response = test_client.post('/letter', json=data)
    assert response.status_code == 400


def test_update_letter(test_client, init_database):
    edited_time = time.time()
    url = '/letter/1'
    data = {
        "text": "newlyUpdatedLetter",
        "edited_date": edited_time,
        "penpal_id": 1,
        "user_id": 1
    }
    response = test_client.put(url, json=data)
    assert response.status_code == 200
    assert response.json["text"] == "newlyUpdatedLetter"
    assert response.json["edited_date"] == pytest.approx(edited_time, abs=1)
    assert response.json["penpal_id"] == 1
    assert response.json["user_id"] == 1


def test_update_letter_with_nonexistant_id(test_client, init_database):
    edited_time = time.time()
    penpal_id = 1
    user_id = 2
    data = {
        "text": "newlyUpdatedLetter",
        "edited_date": edited_time,
        "penpal_id": penpal_id,
        "user_id": user_id,
    }
    response = test_client.put('/letter/100', json=data)
    assert response.status_code == 404


def test_update_letter_penpal_doesnt_exist(test_client, init_database):
    edited_time = time.time()
    penpal_id = 0
    user_id = 2
    data = {
        "text": "newlyUpdatedLetter",
        "edited_date": edited_time,
        "penpal_id": penpal_id,
        "user_id": user_id,
    }
    response = test_client.put('/letter/1', json=data)
    assert response.status_code == 400


def test_update_letter_user_doesnt_exist(test_client, init_database):
    edited_time = time.time()
    penpal_id = 1
    user_id = 0
    data = {
        "text": "newlyUpdatedLetter",
        "edited_date": edited_time,
        "penpal_id": penpal_id,
        "user_id": user_id,
    }
    response = test_client.put('/letter/2', json=data)
    assert response.status_code == 400


def test_delete_letter(test_client, init_database):
    letter = Letter.query.all()[0]
    url = '/letter/' + str(letter.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert Letter.query.get(letter.id) is None


def test_delete_nonexistent_letter(test_client, init_database):
    letter_id = 100
    url = '/letter/' + str(letter_id)
    response = test_client.delete(url)
    assert response.status_code == 404
    assert Letter.query.get(letter_id) is None
