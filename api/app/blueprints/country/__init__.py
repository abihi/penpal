from flask import Blueprint

bp = Blueprint('country', __name__)

from app.blueprints.country import routes
