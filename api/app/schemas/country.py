from app import ma


class CountrySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "name", "latitude", "longitude")

    # Smart hyperlinking
    # _links = ma.Hyperlinks(
    #     {
    #         "self": ma.URLFor("country_detail", id="<id>"),
    #         "collection": ma.URLFor("countries"),
    #     }
    # )


country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)
