from flask import Blueprint

bp = Blueprint("preference", __name__)

from app.blueprints.preference import routes
