from flask import Blueprint

bp = Blueprint("penpal", __name__)

from app.blueprints.penpal import routes
