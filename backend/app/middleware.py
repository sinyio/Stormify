from functools import wraps
from flask import request, jsonify
from app.auth.utils import verify_access_token

def jwt_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Authorization header is missing or invalid'}), 401
        
        token = auth_header.split('Bearer ')[1]
        
        try:
            user = verify_access_token(token)
            return func(user, *args, **kwargs)
        except Exception as e:
            return jsonify({'message': f'Invalid access token, {e}'}), 401
    return wrapper