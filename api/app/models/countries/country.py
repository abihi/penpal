from sqlalchemy.orm import validates
from app import db


class Country(db.Model):
    __tablename__ = "countries"
    id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column("name", db.String(64), index=True, unique=True)
    latitude = db.Column("latitude", db.Float)
    longitude = db.Column("longitude", db.Float)

    def __repr__(self):
        return "<Country {}>".format(self.name)

    def dict(self):
        return dict(
            id=self.id, name=self.name, latitude=self.latitude, longitude=self.longitude
        )

    def from_dict(self, data):
        for key, value in data.items():
            setattr(self, key, value)

    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise AssertionError("No country name provided")
        if Country.query.filter(Country.name == name).first():
            raise AssertionError("Country already exists")
        return name
