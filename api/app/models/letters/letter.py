from sqlalchemy.orm import validates

from app import db
from app.models.penpals.penpal import PenPal
from app.models.users.user import User

class Letter(db.Model):
    __tablename__ = "letters"
    id = db.Column('id', db.Integer, primary_key=True)
    text = db.Column('text', db.String(1256))
    # date stored as integer value of epoch time in milliseconds
    sent_date = db.Column('sent_date', db.Integer)
    edited_date = db.Column('edited_date', db.Integer)
    penpal_id = db.Column(db.Integer, db.ForeignKey('penpals.id'), nullable=False)
    penpal = db.relationship('PenPal', backref='letters', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='letters', lazy=True)

    def __repr__(self):
        return '<Letter {}>'.format(self.id)

    def dict(self):
        return dict(
            id=self.id, text=self.text, sent_date=self.sent_date,
            edited_date=self.edited_date, penpal_id=self.penpal_id, 
            user_id=self.user_id
        )

    @validates('text')
    def validate_text(self, key, text):
        if not text:
            raise AssertionError('No text provided')
        return text

    @validates('sent_date')
    def validate_sent_date(self, key, sent_date):
        if not sent_date:
            raise AssertionError('No sent_date provided')
        return sent_date

    @validates('penpal_id')
    def validate_penpal_id(self, key, penpal_id):
        if not penpal_id:
            raise AssertionError('No penpal_id provided')
        if PenPal.query.get(penpal_id) is None:
            raise AssertionError('No Pen pal with id={id} exists'.format(id=penpal_id))
        return penpal_id

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise AssertionError('No user_id provided')
        if User.query.get(user_id) is None:
            raise AssertionError('No user with id={id} exists'.format(id=user_id))
        return user_id
    