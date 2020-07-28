from flask import Blueprint
from app.blueprints.interest import routes

bp = Blueprint('interest', __name__)
