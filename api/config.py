import os

basedir = os.path.abspath(os.path.dirname(__file__))
# DBUSER = "penpal"
# DBPASS = "penpal"
# DBHOST = "db"
# DBPORT = "5432"
# DBNAME = "devdb"


class Config:
    SECRET_KEY = "this-really-needs-to-be-changed"

    # SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{db}".format(
    #    user=DBUSER, passwd=DBPASS, host=DBHOST, port=DBPORT, db=DBNAME
    # )
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(basedir, "app.db")

    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    CORS_HEADERS = "Content-Type"


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    HOST = "localhost"
    PORT = 5000
    DOMAIN = "localhost:5000"


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "test.db")
