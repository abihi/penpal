import csv
import click

from app import db
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
