from sqlalchemy.orm import validates
from app import db


class Interest(db.Model):
    __tablename__ = "interests"
    id = db.Column("id", db.Integer, primary_key=True)
    activity = db.Column("activity", db.String(64), index=True, unique=True)
    img = db.Column("img", db.String(256))

    def __repr__(self):
        return "<Interest {}>".format(self.activity)

    def dict(self):
        img = self.img is not None ? "https://snigel.s3.eu-north-1.amazonaws.com/interests/" + self.img
        return dict(id=self.id, activity=self.activity, img=img)

    @validates("activity")
    def validate_activity(self, key, activity):
        if not activity:
            raise AssertionError("No interest activity provided")
        if Interest.query.filter(Interest.activity == activity).first():
            raise AssertionError("Interest already exists")
        return activity
