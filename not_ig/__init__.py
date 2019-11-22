import os

from flask import Flask

import extensions
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
    app.register_blueprint(public_blueprint, prefix='/')


def register_extensions(app):
    extensions.db.init_app(app)