from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from faker import Faker

app = Flask(__name__)
app.config.from_object(Config)
login = LoginManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
fake = Faker()
Faker.seed(0)

# Blueprints
from app.blueprints.auth import bp as auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')
from app.blueprints.user import bp as user_bp
app.register_blueprint(user_bp, url_prefix='/user')
from app.blueprints.country import bp as country_bp
app.register_blueprint(country_bp, url_prefix='/country')
from app.blueprints.language import bp as language_bp
app.register_blueprint(language_bp, url_prefix='/language')
from app.blueprints.interest import bp as interest_bp
app.register_blueprint(interest_bp, url_prefix='/interest')
from app.blueprints.seed import bp as seed_bp
app.register_blueprint(seed_bp)

from app import routes, models
from app.models.users.user import User
from app.models.penpals.penpal import PenPal
from app.models.letters.letter import Letter
from app.models.countries.country import Country
from app.models.languages.language import Language
from app.models.interests.interest import Interest
