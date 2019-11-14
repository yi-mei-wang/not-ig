from flask import Blueprint, render_template


public_blueprint = Blueprint('public', __name__)


@public_blueprint.route('/', methods=['GET'])
def index():
    return render_template("public/home.html")
