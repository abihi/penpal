from sqlalchemy.orm import validates
from app import db

class Country(db.Model):
    __tablename__ = "countries"
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(64), index=True, unique=True)

    def __repr__(self):
        return '<Country {}>'.format(self.name)

    def dict(self):
        return dict(id=self.id, name=self.name)

    @validates('name')
    def validate_username(self, key, name):
        if not name:
            raise AssertionError('No country name provided')
        if Country.query.filter(Country.name == name).first():
            raise AssertionError('Country already exists')
        return name
