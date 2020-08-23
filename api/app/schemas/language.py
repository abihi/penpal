from app import ma


class LanguageSchema(ma.Schema):
    class Meta:
        fields = ("id", "name")


language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)
