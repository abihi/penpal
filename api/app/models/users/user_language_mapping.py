from app import db

user_language_mapping = db.Table('user_language_mapping',
                                 db.Column('language_id', db.Integer, db.ForeignKey('languages.id'),
                                           primary_key=True),
                                 db.Column('user_id', db.Integer, db.ForeignKey('users.id'),
                                           primary_key=True)
                                )
