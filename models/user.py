from flask import current_app
from sqlalchemy.ext.hybrid import hybrid_property

from not_ig.extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    profile_image = db.Column(db.String(100), nullable=False)

    @hybrid_property
    def profile_image_url(self):
        return f'${current_app.config.get("S3_LOCATION")}${self.profile_image}'