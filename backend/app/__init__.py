from flask import Flask
from flask_cors import CORS
from .config import Config
from .db import db
from .middleware import jwt_required
from . import auth, weather, user
from .main import main_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    app.register_blueprint(main_bp)
    app.register_blueprint(auth.bp, url_prefix='/auth')
    app.register_blueprint(weather.bp, url_prefix='/weather')
    app.register_blueprint(user.bp, url_prefix='/user')
    
    return app