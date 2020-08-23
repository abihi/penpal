from marshmallow import fields

from app import ma


class CountrySchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    latitude = fields.Float()
    longitute = fields.Float()


country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)
