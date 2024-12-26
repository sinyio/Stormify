import jwt
from datetime import datetime, timedelta
from flask import current_app
from app.models import User

def generate_tokens(user):
    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(minutes=15),  # Access token expires in 15 minutes
        'type': 'access'
    }
    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30),  # Refresh token expires in 30 days
        'type': 'refresh'
    }
    
    access_token = jwt.encode(access_token_payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    refresh_token = jwt.encode(refresh_token_payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

    return access_token, refresh_token


def verify_token(token, token_type):
    try:
        payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        if payload['type'] != token_type:
            raise Exception('Invalid token type')

        user = User.query.get(payload['user_id'])
        if not user:
             raise Exception('User not found')
        
        return user
    except Exception as e:
        raise e

def verify_access_token(token):
    return verify_token(token, 'access')

def verify_refresh_token(token):
    return verify_token(token, 'refresh')