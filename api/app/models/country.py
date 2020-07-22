from app import db

class Country(db.Model):
    __tablename__ = "countries"
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(64), index=True, unique=True)
    residents = db.relationship('User', backref='country_of_recidency', lazy=True)
    nationals = db.relationship('User', backref='country_of_origin', lazy=True)

    def __repr__(self):
        return '<Country {}>'.format(self.name)
