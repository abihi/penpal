from app import db
from app.models.preferences.preference_language_mapping import (
    preference_language_mapping,
)


class Preference(db.Model):
    __tablename__ = "preferences"
    id = db.Column("id", db.Integer, primary_key=True)
    # Man, woman, non-binary, doesn't matter
    gender = db.Column("gender", db.String(64))
    looking_for = db.Column("looking_for", db.String(500))
    # If the user wants a deep connection, superficial, or other
    connection_type = db.Column("connection_type", db.String(64))
    # Snail-mail, instant chat
    communication_type = db.Column("communication_type", db.String(64))
    # If the user wants someone with different or similar interests
    interest_type = db.Column("interest_type", db.String(64))
    language_preference = db.Column("language_preference", db.String(64))
    preferred_languages = db.relationship(
        "Language",
        secondary=preference_language_mapping,
        lazy="subquery",
        backref=db.backref("preferences", lazy=True),
    )

    def __repr__(self):
        return "<Preference {}>".format(self.username)

    def dict(self):
        languages = [lang.dict() for lang in self.preferred_languages]
        return dict(
            id=self.id,
            gender=self.gender,
            looking_for=self.looking_for,
            connection_type=self.connection_type,
            communiction_type=self.communication_type,
            interest_type=self.interest_type,
            language_preference=self.language_preference,
            preferred_languages=languages,
        )

    def from_dict(self, data):
        for key, value in data.items():
            setattr(self, key, value)
