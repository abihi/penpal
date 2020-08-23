from app import ma


class InterestSchema(ma.Schema):
    class Meta:
        fields = ("id", "activity", "img")


interest_schema = InterestSchema()
interests_schema = InterestSchema(many=True)
