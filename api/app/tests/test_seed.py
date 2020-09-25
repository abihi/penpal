import csv
import pytest

from app import db
from app.blueprints.seed import commands
from app.models.users.user import User
from app.models.letters.letter import Letter
from app.models.penpals.penpal import PenPal
from app.models.countries.country import Country
from app.models.interests.interest import Interest
from app.models.languages.language import Language


@pytest.fixture(scope="module")
def init_database():
    db.create_all()

    yield db

    db.drop_all()


def test_if_seed_countries_are_correct(test_client, init_database):
    commands.add_countries()
    with open("../api/app/seed_data/countries.csv", newline="") as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        country_reader = csv.reader(csvfile, delimiter=",", quotechar='"')
        if has_header:
            next(country_reader)
        for country in country_reader:
            country_db = Country.query.filter_by(name=country[3]).first()
            assert country_db.name == country[3]
            assert country_db.latitude == float(country[1])
            assert country_db.longitude == float(country[2])


def test_if_seed_interests_activity_are_correct(test_client, init_database):
    commands.add_interests()
    with open("../api/app/seed_data/interests.csv", newline="") as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        interest_reader = csv.reader(csvfile, delimiter=",", quotechar='"')
        if has_header:
            next(interest_reader)
        for interest in interest_reader:
            interest_db = Interest.query.filter_by(activity=interest[0]).first()
            assert interest_db.activity == interest[0]


def test_if_seed_languages_names_are_correct(test_client, init_database):
    commands.add_languages()
    with open("../api/app/seed_data/languages.csv", newline="") as csvfile:
        has_header = csv.Sniffer().has_header(csvfile.read(1024))
        csvfile.seek(0)
        language_reader = csv.reader(csvfile, delimiter=",", quotechar='"')
        if has_header:
            next(language_reader)
        for language in language_reader:
            language_db = Language.query.filter_by(name=language[3]).first()
            assert language_db.name == language[3]


def test_if_seed_init_adds_correct_number_of_objects(test_client, init_database):
    count_users = 10
    count_letters = 5
    count_penpals = 5

    commands.basic_setup(count_users, count_letters, count_penpals)
    users = User.query.all()
    letters = Letter.query.all()
    penpals = PenPal.query.all()

    assert len(users) == count_users
    assert len(letters) == count_letters
    assert len(penpals) == count_penpals


def test_if_drop_seed_deletes_all_objects(test_client, init_database):
    commands.remove_all_seeds()

    users = User.query.all()
    letters = Letter.query.all()
    penpals = PenPal.query.all()
    countries = Country.query.all()
    languages = Language.query.all()
    interests = Interest.query.all()

    assert len(users) == 0
    assert len(letters) == 0
    assert len(penpals) == 0
    assert len(countries) == 0
    assert len(languages) == 0
    assert len(interests) == 0
