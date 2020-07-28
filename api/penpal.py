import os
from app import app

if os.environ['FLASK_ENV'] == "production":
    app.config.from_object('config.ProductionConfig')
elif os.environ['FLASK_ENV'] == "development":
    app.config.from_object('config.DevelopmentConfig')


if __name__ == '__main__':    
    app.run(port=app.config['PORT'], host=app.config['HOST'], debug=True)
