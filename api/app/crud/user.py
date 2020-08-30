from flask import request

from app import db
from app.models.users.user import User
from app.models.interests.interest import Interest


def read_users():
    return User.query.all()


def read_user(_id):
    user = User.query.get(_id)
    if user is None:
        raise AssertionError("User with id={id} not found".format(id=_id))
    return user


def create_user():
    body = request.get_json()
    user = User()
    user.from_dict(body)
    user.set_password(body["password"])
    db.session.add(user)
    db.session.commit()
    return user


def update_user(_id):
    user = User.query.get(_id)
    if user is None:
        raise AssertionError("User with id={id} not found".format(id=_id))
    body = request.get_json()
    user.from_dict(body)
    db.session.commit()
    return user


def delete_user(_id):
    user = User.query.get(_id)
    if user is None:
        raise AssertionError("User with id={id} not found".format(id=_id))
    db.session.delete(user)
    db.session.commit()


def like_interest(_id):
    body = request.get_json()
    user = User.query.get(_id)
    if user is None:
        raise AssertionError("User with id={id} not found".format(id=_id))
    interest = Interest.query.get(body["interest_id"])
    user.interests.append(interest)
    db.session.commit()
    return user


def unlike_interest(_id):
    body = request.get_json()
    user = User.query.get(_id)
    if user is None:
        raise AssertionError("User with id={id} not found".format(id=_id))
    interest = Interest.query.get(body["interest_id"])
    user.interests.remove(interest)
    db.session.commit()
    return user
