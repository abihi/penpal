from marshmallow import fields

from app import ma


class LetterSchema(ma.Schema):
    id = fields.Integer()
    text = fields.String()
    sent_date = fields.Integer()
    edited_date = fields.Integer()
    penpal_id = fields.Integer()
    user_id = fields.Integer()


letter_schema = LetterSchema()
letters_schema = LetterSchema(many=True)
