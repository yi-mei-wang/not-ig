from flask import Blueprint

from models.image import Image


images_api_blueprint = Blueprint('images_api', __name__)
