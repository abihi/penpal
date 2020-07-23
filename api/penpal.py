import os
from app import app

if 'IN_PRODUCTION' in os.environ:
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')


if __name__ == '__main__':
    app.secret_key = 'super secret key' # put somewhere else - like the config file????
    app.run(port=app.config['PORT'], host=app.config['HOST'], debug=True)
