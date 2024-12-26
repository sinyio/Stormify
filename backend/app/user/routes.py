from flask import jsonify
from app.middleware import jwt_required
from . import bp

@bp.route('/profile', methods=['GET'])
@jwt_required
def get_user_profile(user):
    return jsonify({'username': user.username, 'id': user.id}), 200