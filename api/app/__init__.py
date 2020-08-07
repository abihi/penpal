# flake8: noqa
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from faker import Faker
from flask import Flask

login_manager = LoginManager()
db = SQLAlchemy()
migrate = Migrate()
# cors settings needs to become more secure
# this is only temporary solution
cors = CORS()
fake = Faker()
Faker.seed(0)


# Application factory function
def create_app(config_object):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_object)
    # put somewhere else - like the config file????
    # important that the secret key is set before the LoginManager
    # wraps the app variable.
    app.secret_key = 'super secret key'
    initialize_extensions(app)
    register_blueprints(app)
    return app


def initialize_extensions(app):
    login_manager.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, supports_credentials=True)


from app.blueprints.auth import bp as auth_bp
from app.blueprints.user import bp as user_bp
from app.blueprints.country import bp as country_bp
from app.blueprints.letter import bp as letter_bp
from app.blueprints.penpal import bp as penpal_bp
from app.blueprints.language import bp as language_bp
from app.blueprints.interest import bp as interest_bp
from app.blueprints.seed import bp as seed_bp


def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(country_bp, url_prefix='/country')
    app.register_blueprint(letter_bp, url_prefix='/letter')
    app.register_blueprint(penpal_bp, url_prefix='/penpal')
    app.register_blueprint(language_bp, url_prefix='/language')
    app.register_blueprint(interest_bp, url_prefix='/interest')
    app.register_blueprint(seed_bp)


from app import models
from app.models.users.user import User
from app.models.penpals.penpal import PenPal
from app.models.letters.letter import Letter
from app.models.countries.country import Country
from app.models.languages.language import Language
from app.models.interests.interest import Interest
