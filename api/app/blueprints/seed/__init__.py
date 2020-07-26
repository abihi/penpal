from flask import Blueprint

bp = Blueprint('seed', __name__)

from app.blueprints.seed import commands
