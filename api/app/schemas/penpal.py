from app import ma


class PenPalSchema(ma.Schema):
    class Meta:
        fields = ("id", "created_date")


penpal_schema = PenPalSchema()
penpals_schema = PenPalSchema(many=True)
