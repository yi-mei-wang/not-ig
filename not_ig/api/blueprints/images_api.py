from flask import Blueprint, jsonify, request

from models.image import Image
from not_ig.extensions import db
from services.image_uploader import ImageUploader


images_api_blueprint = Blueprint('images_api', __name__)


@images_api_blueprint.route('/', methods=['GET'])
def show():
    user_id = request.args.get('userId')
    images = [img.path for img in Image.query.filter_by(user_id=user_id)]

    return jsonify(images)


@images_api_blueprint.route('/me', methods=['GET'])
def show_me():
    # Decode auth token from authorization header
    user_id = 1

    images = [img.path for img in Image.query.filter_by(user_id=user_id)]

    return jsonify(images)


@images_api_blueprint.route('/', methods=['POST'])
def create():
    # Get user info from JWT
    img = request.files.get('image')

    path, errors = ImageUploader(img).run()

    new_img = Image(
        user_id=1,
        path=path
    )

    db.session.add(new_img)
    db.session.commit()

    return jsonify({
        'image_url': path,
        "success": True
    })
