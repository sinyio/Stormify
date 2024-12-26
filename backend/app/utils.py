from flask import jsonify
from app.db import db
from app.models import WeatherHistory

def limit_history(user):
    max_history_size = 5
    history_count = WeatherHistory.query.filter_by(user_id=user.id).count()
    
    if history_count > max_history_size:
        oldest_history = WeatherHistory.query.filter_by(user_id=user.id).order_by(WeatherHistory.timestamp).first()
        db.session.delete(oldest_history)