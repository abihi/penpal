from flask import Blueprint

bp = Blueprint("language", __name__)

from app.blueprints.language import routes
