from flask import Blueprint
from app.blueprints.penpal import routes

bp = Blueprint('penpal', __name__)
