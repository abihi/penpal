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

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_users(test_client, init_database):
    response = test_client.get('/user', follow_redirects=True)
    assert response.status_code == 200
