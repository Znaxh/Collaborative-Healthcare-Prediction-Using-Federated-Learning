import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

def test_mongodb_connection():
    try:
        # Your connection string
        uri = "mongodb+srv://znaxxh:DoKfVJcjjbEN6kR7@fedraldata.1on3ci8.mongodb.net/fedhealth?retryWrites=true&w=majority&appName=Fedraldata"
        
        print("🔗 Testing connection to MongoDB Atlas...")
        print(f"📍 Cluster: fedraldata.1on3ci8.mongodb.net")
        
        # Create client
        client = MongoClient(uri)
        
        # Test connection
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB Atlas!")
        
        # List databases
        dbs = client.list_database_names()
        print(f"📁 Available databases: {dbs}")
        
        # Test fedhealth database
        db = client.fedhealth
        collections = db.list_collection_names()
        print(f"📊 Collections in 'fedhealth': {collections}")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

if __name__ == '__main__':
    test_mongodb_connection()