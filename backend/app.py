
from flask import Flask, jsonify, request
from flask_cors import CORS
import mongoengine
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to MongoDB Atlas directly
mongoengine.connect(
    db='fedhealth',
    host=os.getenv('MONGODB_URI'),
    connect=False
)

# Import models and routes after db connection
from models import Hospital, PerformanceMetric, User
from routes import api_bp

app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Test database connection
        Hospital.objects().count()
        return jsonify({'status': 'healthy', 'database': 'connected'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

