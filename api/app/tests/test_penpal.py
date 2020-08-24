import time
import pytest

from app import db
from app.models.penpals.penpal import PenPal


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    penpal1 = PenPal(created_date=time.time())
    db.session.add(penpal1)
    penpal2 = PenPal(created_date=time.time())
    db.session.add(penpal2)

    db.session.commit()

    yield db

    db.drop_all()


def test_get_all_penpals(test_client, init_database):
    response = test_client.get("/penpal", follow_redirects=True)
    assert response.status_code == 200


def test_get_specific_penpal(test_client, init_database):
    response = test_client.get("/penpal/1")
    assert response.status_code == 200


def test_get_specific_penpal_with_nonexistent_id(test_client, init_database):
    response = test_client.get("/penpal/100")
    assert response.status_code == 400


def test_create_penpal(test_client, init_database):
    response = test_client.post("/penpal")
    assert response.status_code == 201


def test_delete_penpal(test_client, init_database):
    penpal = PenPal.query.all()[0]
    url = "/penpal/" + str(penpal.id)
    response = test_client.delete(url)
    assert response.status_code == 204
    assert PenPal.query.get(penpal.id) is None


def test_delete_nonexistent_penpal(test_client, init_database):
    penpal_id = 100
    url = "/penpal/" + str(penpal_id)
    response = test_client.delete(url)
    assert response.status_code == 400
    assert PenPal.query.get(penpal_id) is None
