from flask import Blueprint, jsonify

from models.user import User


users_api_blueprint = Blueprint('users_api', __name__)


@users_api_blueprint.route('/', methods=['GET'])
def index():
    all_users = [
        {
            "id": user.id,
            "username": user.username,
            "profileImage": user.profile_image
        } for user in User.query.all()
    ]

    return jsonify(all_users)


@users_api_blueprint.route('/<id>', methods=['GET'])
def show(id):
    user = User.query.get(id)

    if user:
        return jsonify(
            {'id': user.id,
             'profileImage': user.profile_image,
             'username': user.username}
        )

    return jsonify('user not found'), 404
