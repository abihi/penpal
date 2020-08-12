from flask import Blueprint

bp = Blueprint("letter", __name__)

from app.blueprints.letter import routes
