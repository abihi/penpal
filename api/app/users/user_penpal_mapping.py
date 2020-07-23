from app import db

user_penpal_mapping = db.Table('user_penpal_mapping',
                              db.Column('penpal_id', db.Integer, db.ForeignKey('penpal.id'),
                                        primary_key=True),
                              db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
                              )
