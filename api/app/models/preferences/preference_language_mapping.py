from app import db

preference_language_mapping = db.Table(
    "preference_language_mapping",
    db.Column(
        "language_id", db.Integer, db.ForeignKey("languages.id"), primary_key=True
    ),
    db.Column(
        "preference_id", db.Integer, db.ForeignKey("preferences.id"), primary_key=True
    ),
)
