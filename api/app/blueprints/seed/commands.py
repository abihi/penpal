import csv
import click

from app import db
from app.models.countries.country import Country
from seed import bp as seedbp

@seedbp.cli.command('countries')
@click.argument('file', type=click.File())
def countries(file):
    click.echo('Seeding country table with countries.')
    with open(file, newline='') as csvfile:
        countryreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for country in countryreader:
            db.session.add(Country(name=country[0]))

    db.session.commit()
    click.echo('Done.')
