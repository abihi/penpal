from app import db

class Letter(db.Model):
    __tablename__ = "letters"
    id = db.Column('id', db.Integer, primary_key=True)
    text = db.Column('text', db.String(1256))
    # date stored as integer value of epoch time in milliseconds
    sent_date = db.Column('sent_date', db.Integer)
    penpal_id = db.Column(db.Integer, db.ForeignKey('penpals.id'), nullable=False)
    penpal = db.relationship('PenPal', backref='letters', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='letters', lazy=True)

    def __repr__(self):
        return '<Letter {}>'.format(self.id)
