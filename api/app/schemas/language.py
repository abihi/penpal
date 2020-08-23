from marshmallow import fields

from app import ma


class LanguageSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()


language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)
