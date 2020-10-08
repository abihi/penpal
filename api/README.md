# Installation
Create virtualenv:
1.  $ cd penpal/api
2.  $ python3 -m venv venv (linux) / py -m venv venv (windows)
3.  $ source venv/bin/activate (linux) / .\venv\Scripts\activate (windows)
4.  $ pip3 install -r requirements.txt
5.  $ flask db upgrade

# API and PostgresDB containers
*  $ docker-compose up --build -d   # Run the containers.
*  $ docker-compose down   # Stop and remove everything.

# Run app & update requirements.txt
*   $ FLASK_ENV=development flask run
*   ($ deactivate) deactivates the Virtualenvironment
*   ($ pip freeze > requirements.txt)
*   ($ pip freeze) get a list of all installed packages and their versions

# Seed the database
*   $ flask seed init 
*   $ flask seed drop

# Run tests
*  $ python -m pytest

# HEROKU
Install the Heroku CLI:
* $ heroku login

Add remote penpal application:
* $ heroku git:remote -a penpal

Deploy your changes:
   1. $ git add .
   2. $ git commit -am "make it better"
   3. $ git push heroku master


# GIT COMMANDS
Migrations (both development and local):
*   $ cd my_project_folder
*   $ source venv/bin/activate (if local)
*   $ python manage.py db migrate
*   $ python manage.py db upgrade


# Heroku
*   $ heroku config:set
*   $ heroku logs --tail
*   $ heroku open
*   $ heroku run bash
*   $ heroku pg:psql (execute SQL commands)
