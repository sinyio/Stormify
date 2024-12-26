import requests
from flask import current_app

def get_weather_data(city, units):
    api_key = current_app.config['OPENWEATHER_API_KEY']
    base_url = 'http://api.openweathermap.org/data/2.5/weather'
    url = f'{base_url}?q={city}&appid={api_key}&units={units}'
    
    response = requests.get(url)
    response.raise_for_status()
    return response.json()