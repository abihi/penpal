import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config():
    # ...
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    CORS_HEADERS = 'Content-Type'


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    HOST = 'localhost'
    PORT = 5000
    DOMAIN = 'localhost:5000'


class TestingConfig(Config):
    TESTING = True
