from flask import Flask, jsonify, request
from flask_cors import CORS  # For handling CORS
from bson import ObjectId
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from existing .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Use existing MONGODB_URI from your .env file
client = MongoClient(os.getenv('MONGODB_URI'))
db = client.hostelconnect  # Use your database name

@app.route('/api/leave/status/<email>')
def get_leave_status(email):
    try:
        # Get pagination parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit

        # Get total count of documents for this user
        total_docs = db.leaves.count_documents({'email': email})

        # Get paginated leaves, sorted by creation date (newest first)
        leaves = list(db.leaves.find(
            {'email': email},
            {'_id': 1, 'visitingPlace': 1, 'reason': 1, 'leaveType': 1,
             'fromDate': 1, 'timeFrom': 1, 'toDate': 1, 'timeTo': 1,
             'status': 1, 'remarks': 1}
        ).sort('createdAt', -1)
         .skip(skip)
         .limit(limit))

        # Convert ObjectId to string for JSON serialization
        for leave in leaves:
            leave['_id'] = str(leave['_id'])

        return jsonify({
            'success': True,
            'leaves': leaves,
            'total': total_docs,
            'hasMore': (skip + limit) < total_docs
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }) 