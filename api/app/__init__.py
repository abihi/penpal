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


from app import routes, models, quotes
from app.models.user import User
