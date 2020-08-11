import time
import csv
from random import randrange

import click
from sqlalchemy import exc, func

from app import db
from app import fake
from app.models.users.user import User
from app.models.letters.letter import Letter
from app.models.penpals.penpal import PenPal
from app.models.countries.country import Country
from app.models.languages.language import Language
from app.models.interests.interest import Interest
from app.blueprints.seed import bp as seedbp


@seedbp.cli.command('add_countries')
def add_countries():
    click.echo('Seeding country table with countries.')
    with open('countries.csv', newline='') as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        country_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        if has_header:
            next(country_reader)
        for country in country_reader:
            try:
                latitude = float(country[1])
                longitude = float(country[2])
                db.session.add(
                    Country(
                        name=country[3],
                        latitude=latitude,
                        longitude=longitude
                    )
                )
            except AssertionError:
                pass  # Skips the line in csv
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


@seedbp.cli.command('add_languages')
def add_languages():
    click.echo('Seeding language table with languages.')
    with open('languages.csv', newline='') as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        language_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        if has_header:
            next(language_reader)
        for language in language_reader:
            try:
                db.session.add(Language(name=language[3]))
            except AssertionError:
                pass
    db.session.commit()
    click.echo('Done.')


@seedbp.cli.command('drop_languages')
def drop_languages():
    click.echo('Removing all languages in language table.')
    languages = Language.query.all()
    for language in languages:
        db.session.delete(language)
    db.session.commit()
    click.echo('Done.')


@seedbp.cli.command('add_interests')
def add_interests():
    click.echo('Seeding interest table with interests.')
    with open('interests.csv', newline='') as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        interest_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        if has_header:
            next(interest_reader)
        for interest in interest_reader:
            try:
                db.session.add(Interest(activity=interest[0]))
            except AssertionError:
                pass
    db.session.commit()
    click.echo('Done.')


@seedbp.cli.command('drop_interests')
def drop_interests():
    click.echo('Removing all interests in interest table.')
    interests = Interest.query.all()
    for interest in interests:
        db.session.delete(interest)
    db.session.commit()
    click.echo('Done.')


@seedbp.cli.command('add_users')
@click.argument('count')
def add_users(count):
    click.echo('Seeding user table with users.')
    for _ in range(int(count)):
        try:
            user = User(
                username=fake.name(),
                email=fake.email(),
                country_id=randrange(1, 244)
            )
            user.set_password(fake.text(max_nb_chars=20))

            no_of_languages = randrange(1, 4)
            languages = []
            for _ in range(no_of_languages):
                languages.append(Language.query.filter_by(
                    id=randrange(1, 184)).first()
                )
            user.languages = list(dict.fromkeys(languages))

            no_of_interests = randrange(4, 10)
            interests = []
            for _ in range(no_of_interests):
                interests.append(Interest.query.filter_by(
                    id=randrange(1, 300)).first()
                )
            user.interests = list(dict.fromkeys(interests))

            db.session.add(user)
        except AssertionError:
            pass  # Skips that user e.g. faker randomized user with same name
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


@seedbp.cli.command('add_letters')
@click.argument('count')
def add_letters(count):
    click.echo('Seeding letter table with letters.')
    for _ in range(int(count)):
        penpal = PenPal.query.order_by(func.random()).first()
        user = User.query.order_by(func.random()).first()
        letter = Letter(text=fake.text(), sent_date=time.time(),
                        penpal_id=penpal.id, user_id=user.id)
        try:
            db.session.add(letter)
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
    click.echo('Done.')


@seedbp.cli.command('drop_letters')
def drop_letters():
    click.echo('Removing all letters in letter table.')
    letters = Letter.query.all()
    for letter in letters:
        db.session.delete(letter)
    db.session.commit()
    click.echo('Done.')
