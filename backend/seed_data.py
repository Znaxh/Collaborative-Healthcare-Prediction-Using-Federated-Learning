from app import app
from models import Hospital, PerformanceMetric
import logging

def seed_database():
    """Seed the database with sample data"""
    with app.app_context():
        try:
            # Clear existing data
            print("Clearing existing data...")
            Hospital.drop_collection()
            PerformanceMetric.drop_collection()
            
            # Create sample hospitals
            print("Creating sample hospitals...")
            hospitals_data = [
                {"name": "General Hospital", "location": "New York", "is_active": True, "data_points": 15000},
                {"name": "City Medical Center", "location": "Los Angeles", "is_active": True, "data_points": 12000},
                {"name": "Regional Health", "location": "Chicago", "is_active": True, "data_points": 18000},
                {"name": "Metro Hospital", "location": "Houston", "is_active": False, "data_points": 8000},
                {"name": "University Medical", "location": "Boston", "is_active": True, "data_points": 22000},
                {"name": "Central Hospital", "location": "Phoenix", "is_active": True, "data_points": 14000},
                {"name": "Valley Health", "location": "San Francisco", "is_active": True, "data_points": 16000},
                {"name": "Community Medical", "location": "Seattle", "is_active": True, "data_points": 11000},
                {"name": "Memorial Hospital", "location": "Denver", "is_active": True, "data_points": 13000},
                {"name": "St. Mary's Hospital", "location": "Miami", "is_active": True, "data_points": 17000},
                {"name": "Children's Hospital", "location": "Atlanta", "is_active": True, "data_points": 9000},
                {"name": "Veterans Medical", "location": "Dallas", "is_active": True, "data_points": 20000},
                {"name": "Riverside Hospital", "location": "Portland", "is_active": False, "data_points": 7000},
                {"name": "Mountain View Medical", "location": "Salt Lake City", "is_active": False, "data_points": 6000},
                {"name": "Coastal Health", "location": "San Diego", "is_active": True, "data_points": 15500},
            ]
            
            for hospital_data in hospitals_data:
                hospital = Hospital(**hospital_data)
                hospital.save()
            
            print(f"Created {len(hospitals_data)} hospitals")
            
            # Create performance history
            print("Creating performance metrics...")
            performance_data = [
                {'round': 1, 'accuracy': 0.72, 'f1_score': 0.68, 'hospitals': 8, 'data_points': 95000},
                {'round': 2, 'accuracy': 0.75, 'f1_score': 0.71, 'hospitals': 10, 'data_points': 110000},
                {'round': 3, 'accuracy': 0.78, 'f1_score': 0.74, 'hospitals': 11, 'data_points': 125000},
                {'round': 4, 'accuracy': 0.81, 'f1_score': 0.77, 'hospitals': 12, 'data_points': 140000},
                {'round': 5, 'accuracy': 0.83, 'f1_score': 0.80, 'hospitals': 12, 'data_points': 155000},
                {'round': 6, 'accuracy': 0.847, 'f1_score': 0.823, 'hospitals': 12, 'data_points': 170000},
            ]
            
            for data in performance_data:
                metric = PerformanceMetric(
                    round_number=data['round'],
                    accuracy=data['accuracy'],
                    f1_score=data['f1_score'],
                    participating_hospitals=data['hospitals'],
                    total_data_points=data['data_points']
                )
                metric.save()
            
            print(f"Created {len(performance_data)} performance metrics")
            print("✅ Database seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding database: {e}")
            logging.error(f"Seeding error: {e}")

if __name__ == '__main__':
    seed_database()