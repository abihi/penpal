import csv
import click
from random import randrange

from app import db
from app import fake
from app.models.users.user import User
from app.models.countries.country import Country
from app.blueprints.seed import bp as seedbp

@seedbp.cli.command('add_countries')
def add_countries():
    click.echo('Seeding country table with countries.')
    with open('countries.csv', newline='') as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        countryreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        if has_header:
            next(countryreader)
        for country in countryreader:
            db.session.add(Country(name=country[0]))

    db.session.commit()
    click.echo('Done.')

@seedbp.cli.command('drop_countries')
def drop_countries():
    click.echo('Removing all countries in country table.')
    countries = Country.query.all()
    for country in countries:
        db.session.delete(country)
    db.session.commit()
    click.echo('Done.')

@seedbp.cli.command('add_users')
@click.argument('count')
def add_users(count):
    click.echo('Seeding user table with users.')
    for _ in range(int(count)):
        user = User(username=fake.name(), email=fake.email(), country_id=randrange(1, 249))
        user.set_password(fake.text(max_nb_chars=20))
        db.session.add(user)

    db.session.commit()
    click.echo('Done.')

@seedbp.cli.command('drop_users')
def drop_users():
    click.echo('Removing all users in user table.')
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    db.session.commit()
    click.echo('Done.')
