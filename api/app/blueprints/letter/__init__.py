from flask import Blueprint
from app.blueprints.letter import routes

bp = Blueprint('letter', __name__)
