from flask import request, jsonify
from flask_bcrypt import Bcrypt # ADDED IMPORT
from app.models import User
from app.auth.utils import generate_tokens,  verify_refresh_token
from app.db import db
from .schemas import UserSchema
from datetime import timedelta

from . import bp
bcrypt = Bcrypt() # NO ERROR NOW

@bp.route('/register', methods=['POST'])
def register():
    from app.middleware import jwt_required # ADDED IMPORT
    data = request.get_json()
    try:
        user_data = UserSchema().load(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    
    if User.query.filter_by(username=user_data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
        
    hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
    new_user = User(username=user_data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@bp.route('/login', methods=['POST'])
def login():
    from app.middleware import jwt_required # ADDED IMPORT
    data = request.get_json()
    try:
        user_data = UserSchema().load(data)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    user = User.query.filter_by(username=user_data['username']).first()
    if not user or not bcrypt.check_password_hash(user.password, user_data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
        
    access_token, refresh_token = generate_tokens(user)
    user.refresh_token = refresh_token
    db.session.commit()

    return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200

@bp.route('/refresh', methods=['POST'])
def refresh():
    from app.middleware import jwt_required # ADDED IMPORT
    data = request.get_json()
    refresh_token = data.get('refresh_token')
    
    if not refresh_token:
        return jsonify({'message': 'Refresh token is required'}), 400
    
    try:
        user = verify_refresh_token(refresh_token)
    except Exception as e:
         return jsonify({'message': 'Invalid refresh token'}), 401
    
    access_token, new_refresh_token = generate_tokens(user)
    user.refresh_token = new_refresh_token
    db.session.commit()
    
    return jsonify({'access_token': access_token, 'refresh_token': new_refresh_token}), 200