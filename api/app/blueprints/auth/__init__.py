from flask import Blueprint
from app.blueprints.auth import routes

bp = Blueprint('auth', __name__)
