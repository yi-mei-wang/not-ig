from flask import current_app
from sqlalchemy.ext.hybrid import hybrid_property

from models.user import User
from not_ig.extensions import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id', ondelete='CASCADE'))

    @hybrid_property
    def img_url(self):
        return f'{current_app.config.get("S3_LOCATION")}{self.profile_image}'
