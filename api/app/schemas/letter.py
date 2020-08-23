from app import ma


class LetterSchema(ma.Schema):
    class Meta:
        fields = ("id", "text", "sent_date", "edited_date", "penpal_id", "user_id")


letter_schema = LetterSchema()
letters_schema = LetterSchema(many=True)
