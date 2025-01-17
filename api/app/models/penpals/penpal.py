from app import db


class PenPal(db.Model):
    __tablename__ = "penpals"
    id = db.Column("id", db.Integer, primary_key=True)
    # date stored as integer value of epoch time in seconds
    created_date = db.Column("created_date", db.Integer)

    def __repr__(self):
        return "<PenPal {}>".format(self.id)

    def dict(self):
        return dict(id=self.id, created_date=self.created_date)

    def from_dict(self, data):
        for key, value in data.items():
            setattr(self, key, value)
