import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+mysqlconnector://user:password@db:3306/weather')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt_secret_key')
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY', 'your_openweathermap_api_key')