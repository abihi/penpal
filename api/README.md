# Installation
Create virtualenv:
1.  $ cd my_project_folder
2.  $ virtualenv -p python3.7 venv
3.  $ source venv/bin/activate
4.  $ pip install -r requirements.txt
*   ($ deactivate) Avaktiverar Virtualenvironment
*   ($ pip freeze > requirements.txt)
*   ($ pip freeze) get a list of all installed packages and their versions


Flask-sqlalchemy
1.  $ flask db init
2.  $ flask db migrate
3.  $ flask db upgrade

# HEROKU

Install the Heroku CLI
* $ heroku login

Add remote dondil application
* $ heroku git:remote -a dondil

Deploy your changes
   1. $ git add .
   2. $ git commit -am "make it better"
   3. $ git push heroku master


# GIT COMMANDS
Migrations (both development and local):
*   $ cd my_project_folder
*   $ source venv/bin/activate (if local)
*   $ python manage.py db migrate
*   $ python manage.py db upgrade

Heroku
*   $ heroku config:set
*   $ heroku logs --tail
*   $ heroku open
*   $ heroku run bash
*   $ heroku pg:psql (execute SQL commands)