from marshmallow import fields

from app import ma


class InterestSchema(ma.Schema):
    id = fields.Integer()
    activity = fields.String()
    img = fields.String()


interest_schema = InterestSchema()
interests_schema = InterestSchema(many=True)
