from flask import Flask

from not_ig.web.public.views import public_blueprint


def create_app():
    app = Flask(__name__)

    register_blueprints(app)

    return app


def register_blueprints(app):
    app.register_blueprint(public_blueprint, prefix='/')
