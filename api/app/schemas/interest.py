from app import ma


class InterestSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "activity", "img")

    # Smart hyperlinking
    # _links = ma.Hyperlinks(
    #     {
    #         "self": ma.URLFor("interest_detail", id="<id>"),
    #         "collection": ma.URLFor("interests"),
    #     }
    # )


interest_schema = InterestSchema()
interests_schema = InterestSchema(many=True)
