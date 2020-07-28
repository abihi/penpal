from flask import Blueprint
from app.blueprints.language import routes

bp = Blueprint('language', __name__)
