import os
from app import create_app
from config import Config

app = create_app(Config)

if os.environ["FLASK_ENV"] == "production":
    app.config.from_object("config.ProductionConfig")
elif os.environ["FLASK_ENV"] == "development":
    app.config.from_object("config.DevelopmentConfig")

# put somewhere else - like the config file????
app.secret_key = "super secret key"

if __name__ == "__main__":
    app.run(port=app.config["PORT"], host=app.config["HOST"], debug=True)
