from flask import request, jsonify
from app.middleware import jwt_required
from app.db import db
from app.models import WeatherHistory
from .api import get_weather_data
from app.utils import limit_history

from . import bp

@bp.route('/current', methods=['GET'])
@jwt_required
def get_current_weather(user):
    city = request.args.get('city')
    units = request.args.get('units', 'metric')

    if not city:
        return jsonify({'message': 'City is required'}), 400
        
    try:
        weather_data = get_weather_data(city, units)
        
        new_history = WeatherHistory(user_id = user.id, city = city)
        db.session.add(new_history)
        limit_history(user)
        db.session.commit()
        
        return jsonify(weather_data), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/history', methods=['GET'])
@jwt_required
def get_weather_history(user):
    
    history = WeatherHistory.query.filter_by(user_id = user.id).order_by(WeatherHistory.timestamp.desc()).all()
    history_list = [{'city': item.city, 'timestamp': item.timestamp} for item in history]
    return jsonify(history_list), 200