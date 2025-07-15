import mongoengine as me
from datetime import datetime

class User(me.Document):
    email = me.EmailField(required=True, unique=True)
    display_name = me.StringField(required=True)
    created_at = me.DateTimeField(default=datetime.utcnow)
    last_login = me.DateTimeField()
    is_active = me.BooleanField(default=True)
    
    meta = {
        'collection': 'users',
        'indexes': ['email']
    }

class Hospital(me.Document):
    name = me.StringField(required=True)
    location = me.StringField()
    is_active = me.BooleanField(default=True)
    joined_at = me.DateTimeField(default=datetime.utcnow)
    data_points = me.IntField(default=0)
    
    meta = {
        'collection': 'hospitals',
        'indexes': ['name', 'is_active']
    }

class PerformanceMetric(me.Document):
    round_number = me.IntField(required=True)
    accuracy = me.FloatField(required=True)
    f1_score = me.FloatField(required=True)
    participating_hospitals = me.IntField(required=True)
    total_data_points = me.IntField(default=0)
    created_at = me.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'performance_metrics',
        'indexes': ['round_number', '-created_at']
    }