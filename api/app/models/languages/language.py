from app import db

class Language(db.Model):
    __tablename__ = "languages"
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(64))

    def __repr__(self):
        return '<Language {}>'.format(self.name)

    def dict(self):
        return dict(id=self.id, name=self.name)
