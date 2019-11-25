from flask import Blueprint, jsonify, request

from models.image import Image


images_api_blueprint = Blueprint('images_api', __name__)


@images_api_blueprint.route('/', methods=['GET'])
def index():
    user_id = request.args.get('userId')
    images = [img.path for img in Image.query.filter_by(user_id=user_id)]

    return jsonify(images)
