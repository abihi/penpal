from app import db

user_preference_mapping = db.Table(
    "user_preference_mapping",
    db.Column(
        "preference_id", db.Integer, db.ForeignKey("preferences.id"), primary_key=True
    ),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)
