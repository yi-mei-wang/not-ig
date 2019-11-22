from flask import Blueprint, render_template


public_blueprint = Blueprint('public', __name__)


@public_blueprint.route('/', methods=['GET'])
def index():
    return render_template("public/home.html")


# Catch all routes
@public_blueprint.route('/<path:path>', methods=["GET"])
def catch_all(**kwargs):
    # Which html? and what goes into the html?
    return render_template("public/home.html")