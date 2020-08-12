from app import db

user_interest_mapping = db.Table(
    "user_interest_mapping",
    db.Column(
        "interest_id", db.Integer, db.ForeignKey("interests.id"), primary_key=True
    ),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)
