from marshmallow import Schema, fields

class UserProfileSchema(Schema):
    username = fields.String(required=True)
    id = fields.Integer(required=True)