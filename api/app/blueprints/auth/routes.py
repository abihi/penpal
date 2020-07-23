import datetime

from flask import jsonify, request, redirect

# app dependencies
from app import db
from app.blueprints.auth import bp
# models
from app.models.users.user import User


@bp.route('/', methods=['GET'])
def login():
    return "Not implemented"
