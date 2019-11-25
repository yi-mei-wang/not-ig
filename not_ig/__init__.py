import os

from flask import Flask

import not_ig.extensions
from not_ig.api.blueprints.users_api import users_api_blueprint
from not_ig.api.blueprints.images_api import images_api_blueprint
from not_ig.web.public.views import public_blueprint


def create_app():
    app = Flask(__name__)

    if os.getenv('FLASK_ENV') == 'production':
        app.config.from_object("config.ProductionConfig")
    else:
        app.config.from_object("config.DevelopmentConfig")

    register_blueprints(app)
    register_extensions(app)

    return app


def register_blueprints(app):
    app.register_blueprint(images_api_blueprint, url_prefix='/api/v1/images')
    app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')
    app.register_blueprint(public_blueprint, url_prefix='/')


def register_extensions(app):
    extensions.db.init_app(app)
    extensions.migrate.init_app(app, extensions.db)
