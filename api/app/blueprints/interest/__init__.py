from flask import Blueprint

bp = Blueprint('interest', __name__)

from app.blueprints.interest import routes
