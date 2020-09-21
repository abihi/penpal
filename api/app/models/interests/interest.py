from sqlalchemy.orm import validates
from app import db


class Interest(db.Model):
    __tablename__ = "interests"
    id = db.Column("id", db.Integer, primary_key=True)
    activity = db.Column("activity", db.String(64), index=True, unique=True)
    interest_class = db.Column("class", db.String(64))
    interest_type = db.Column("type", db.String(64))
    img = db.Column("img", db.String(256))

    def __repr__(self):
        return "<Interest {}>".format(self.activity)

    def dict(self):
        img = self.img
        return dict(
            id=self.id,
            activity=self.activity,
            interest_class=self.interest_class,
            interest_type=self.interest_type,
            img=img,
        )

    def from_dict(self, data):
        for key, value in data.items():
            setattr(self, key, value)

    @validates("activity")
    def validate_activity(self, key, activity):
        if not activity:
            raise AssertionError("No interest activity provided")
        if Interest.query.filter(Interest.activity == activity).first():
            raise AssertionError("Interest already exists")
        return activity
