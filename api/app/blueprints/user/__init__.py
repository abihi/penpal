from flask import Blueprint
from app.blueprints.user import routes

bp = Blueprint('user', __name__)
