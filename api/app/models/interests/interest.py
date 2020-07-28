from app import db

class Interest(db.Model):
    __tablename__ = "interests"
    id = db.Column('id', db.Integer, primary_key=True)
    activity = db.Column('activity', db.String(64), index=True, unique=True)
    img = db.Column('img', db.String(256))

    def __repr__(self):
        return '<Interest {}>'.format(self.activity)

    def dict(self):
        return dict(id=self.id, activity=self.activity, img=self.img)
