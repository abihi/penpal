from app import db

# m-2-m relationship table between User and Interest objects
# used to create the relationship between the user's interest
# attribute and interest objects
from app.models.user_interest_mapping import user_interest_mapping

class User(db.Model):
    __tablename__ = "users"
    id = db.Column('id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(64), index=True, unique=True)
    email = db.Column('email', db.String(120), index=True, unique=True)
    password_hash = db.Column('password_hash', db.String(128))
    interests = db.relationship('Interest', secondary=user_interest_mapping, lazy='subquery',
                           backref=db.backref('users', lazy=True))

    def __repr__(self):
        return '<User {}>'.format(self.username)
