from app import db

# m-2-m relationship table between User and Interest objects
# used to create the relationship between the user's interest
# attribute and interest objects
from app.models.user_interest_mapping import user_interest_mapping
# m-2-m relationship similar to user and interest
from app.models.user_language_mapping import user_language_mapping

class User(db.Model):
    __tablename__ = "users"
    id = db.Column('id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(64), index=True, unique=True)
    email = db.Column('email', db.String(120), index=True, unique=True)
    email_verified = db.Column('email_verified', db.Boolean, default=False)
    password_hash = db.Column('password_hash', db.String(128))
    # 1-to-m relationship between country and user. The country of origin and recidency can
    # also be back referenced as 'country_of_origin' and 'country_of_recidency'. I.g
    # 'user.country_of_origin' would provide the user's country of origin. The naming
    # of the back reference is defined in the country table
    country_of_origin_id = db.Column('country_of_origin_id', db.Integer, db.ForeignKey('countries.id'), nullable=True)
    country_of_recidency_id = db.Column('country_of_recidency_id', db.Integer, db.ForeignKey('countries.id'), nullable=True)
    # 1-to-m relationship between letter and user. All letters of a user can be
    # accessed through this attribute. The author of a letter can also be accessed
    # through back referencing 'letter.author' as defined below
    letters = db.relationship('Letter', backref='author', lazy=True)
    languages = db.relationship('Language', secondary=user_language_mapping, lazy='subquery',
                           backref=db.backref('users', lazy=True))
    interests = db.relationship('Interest', secondary=user_interest_mapping, lazy='subquery',
                           backref=db.backref('users', lazy=True))

    def __repr__(self):
        return '<User {}>'.format(self.username)
