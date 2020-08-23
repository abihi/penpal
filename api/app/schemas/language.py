from app import ma


class LanguageSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "name")

    # Smart hyperlinking
    # _links = ma.Hyperlinks(
    #     {
    #         "self": ma.URLFor("language_detail", id="<id>"),
    #         "collection": ma.URLFor("languages"),
    #     }
    # )


language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)
