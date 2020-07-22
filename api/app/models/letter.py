from app import db

class Letter(db.Model):
    __tablename__ = "letters"
    id = db.Column('id', db.Integer, primary_key=True)
    text = db.Column('text', db.String(1256))
    sent_date = db.Column('sent_date', db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return '<Letter {}>'.format(self.id)
