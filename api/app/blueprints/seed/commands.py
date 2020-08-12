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


@seedbp.cli.command('init')
@click.argument('count', default=10)
def init(count):
    add_countries()
    add_interests()
    add_languages()
    add_users(count)
    add_penpals(count)
    add_letters(count)


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


def add_users(count):
    click.echo(f'Seeding user table with {count} new users.')
    for _ in range(int(count)):
        try:
            user = User(
                username=fake.name(),
                email=fake.email(),
                country_id=Country.query.order_by(func.random()).first().id
            )
            user.set_password(fake.text(max_nb_chars=20))

            languages = Language.query.order_by(
                func.random()).limit(randrange(1, 4))
            user.languages = list(dict.fromkeys(languages))
            interests = Interest.query.order_by(
                func.random()).limit(randrange(4, 10))
            user.interests = list(dict.fromkeys(interests))

            db.session.add(user)
        except AssertionError:
            pass  # Skips that user e.g. faker randomized user with same name
    db.session.commit()
    click.echo('Done.')


def add_penpals(count):
    click.echo('Adding penpals.')
    for _ in range(count):
        penpal = PenPal(created_date=time.time())
        db.session.add(penpal)
    db.session.commit()
    click.echo('Done.')


def add_letters(count):
    click.echo(f'Seeding letter table with {count} new letters.')
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


@seedbp.cli.command('drop')
def drop():
    drop_users()
    drop_countries()
    drop_interests()
    drop_languages()
    drop_penpals()
    drop_letters


def drop_countries():
    click.echo('Removing all countries in country table.')
    countries = Country.query.all()
    for country in countries:
        db.session.delete(country)
    db.session.commit()
    click.echo('Done.')


def drop_languages():
    click.echo('Removing all languages in language table.')
    languages = Language.query.all()
    for language in languages:
        db.session.delete(language)
    db.session.commit()
    click.echo('Done.')


def drop_interests():
    click.echo('Removing all interests in interest table.')
    interests = Interest.query.all()
    for interest in interests:
        db.session.delete(interest)
    db.session.commit()
    click.echo('Done.')


def drop_users():
    click.echo('Removing all users in user table.')
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    db.session.commit()
    click.echo('Done.')


def drop_penpals():
    click.echo('Removing all penpals in penpal table.')
    penpals = PenPal.query.all()
    for penpal in penpals:
        db.session.delete(penpal)
    db.session.commit()
    click.echo('Done.')


def drop_letters():
    click.echo('Removing all letters in letter table.')
    letters = Letter.query.all()
    for letter in letters:
        db.session.delete(letter)
    db.session.commit()
    click.echo('Done.')
