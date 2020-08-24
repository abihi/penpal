from marshmallow import fields

from app import ma
from app.schemas.language import LanguageSchema


class PreferenceSchema(ma.Schema):
    class Meta:
        include_relationships = True
        include_fk = True

    id = fields.Integer()
    gender = fields.String()
    looking_for = fields.String()
    connection_type = fields.String()
    communication_type = fields.String()
    interest_type = fields.String()
    language_preference = fields.String()
    preferred_languages = fields.Nested(LanguageSchema)


preference_schema = PreferenceSchema()
preferences_schema = PreferenceSchema(many=True)
