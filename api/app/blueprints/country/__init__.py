from flask import Blueprint
from app.blueprints.country import routes

bp = Blueprint('country', __name__)
