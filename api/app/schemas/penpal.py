from marshmallow import fields

from app import ma


class PenPalSchema(ma.Schema):
    id = fields.Integer()
    created_date = fields.Integer()


penpal_schema = PenPalSchema()
penpals_schema = PenPalSchema(many=True)
