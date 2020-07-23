from app import db

class PenPal(db.Model):
    __tablename__ = "penpals"
    id = db.Column('id', db.Integer, primary_key=True)
    created_date = db.Column('created_date', db.Integer) # date stored as integer value of epoch time in milliseconds

    def __repr__(self):
        return '<PenPal {}>'.format(self.id)
