from flask import Blueprint
from app.blueprints.seed import commands

bp = Blueprint('seed', __name__)
