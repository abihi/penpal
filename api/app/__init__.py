from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Blueprints
from app.blueprints.auth import bp as auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')
from app.blueprints.user import bp as user_bp
app.register_blueprint(user_bp, url_prefix='/user')

from app import routes, models
from app.models.users.user import User
