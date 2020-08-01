import validators

from flask_login import UserMixin
from sqlalchemy.orm import validates
from email_validator import validate_email, EmailNotValidError
from werkzeug.security import generate_password_hash, check_password_hash

from app import db

# m-2-m relationship table between User and Interest objects
# used to create the relationship between the user's interest
# attribute and interest objects
from app.models.users.user_interest_mapping import user_interest_mapping
# m-2-m relationship similar to user and interest
from app.models.users.user_language_mapping import user_language_mapping
# m-2-m relationship similar to user and interest
from app.models.users.user_penpal_mapping import user_penpal_mapping


class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column('id', db.Integer, primary_key=True)
    username = db.Column('username', db.String(64), index=True, unique=True)
    email = db.Column('email', db.String(120), index=True, unique=True)
    email_verified = db.Column('email_verified', db.Boolean, default=False)
    password_hash = db.Column('password_hash', db.String(128))
    # 1-to-m relationship between country and user. The users can also be back
    # referenced as 'country.residents' and 'country.nationals'.
    country_id = db.Column('country_id', db.Integer, db.ForeignKey('countries.id'), nullable=True)
    country = db.relationship('Country', foreign_keys=[country_id], backref='residents', lazy=True)
    languages = db.relationship('Language', secondary=user_language_mapping, lazy='subquery',
                                backref=db.backref('users', lazy=True))
    interests = db.relationship('Interest', secondary=user_interest_mapping, lazy='subquery',
                                backref=db.backref('users', lazy=True))
    penpals = db.relationship('PenPal', secondary=user_penpal_mapping, lazy='subquery',
                              backref=db.backref('users', lazy=True))

    def dict(self):
        return dict(id=self.id, username=self.username, email=self.email, country=self.country_id)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        if not password:
            raise AssertionError('Password not provided')
        if not validators.length(password, min=6):
            raise AssertionError('Password must be longer than 6 characters')
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username).first():
            raise AssertionError('Username already exists')
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('No email provided')
        if User.query.filter(User.email == email).first():
            raise AssertionError('Email already exists')
        try:
            valid = validate_email(email)
            email = valid.email
        except EmailNotValidError as error:
            raise AssertionError(error)
        if not validators.domain(email.split('@')[1]):
            return AssertionError(domain=email.split('@')[1])
        return email
