from marshmallow import fields

from app import ma
from app.schemas.country import CountrySchema
from app.schemas.interest import InterestSchema
from app.schemas.language import LanguageSchema


class UserSchema(ma.Schema):
    class Meta:
        include_relationships = True
        include_fk = True

    id = fields.Integer()
    username = fields.String()
    email = fields.Email()
    birthdate = fields.Date()
    gender = fields.String()
    about_me = fields.String()
    onboarded = fields.Boolean()
    country_id = fields.Integer()
    country = fields.Nested(CountrySchema)
    languages = fields.List(fields.Nested(LanguageSchema))
    interests = fields.List(fields.Nested(InterestSchema))

    # Smart hyperlinking
    # _links = ma.Hyperlinks(
    #     {
    #         "self": ma.URLFor("user_detail", id="<id>"),
    #         "collection": ma.URLFor("users"),
    #     }
    # )


user_schema = UserSchema()
users_schema = UserSchema(many=True)
