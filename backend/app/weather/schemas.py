from marshmallow import Schema, fields

class WeatherSchema(Schema):
    city = fields.String(required=True)
    units = fields.String(missing='metric')