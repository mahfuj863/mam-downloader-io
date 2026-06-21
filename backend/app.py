import os
import sys
from pathlib import Path
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import config
from database.db import db

def create_app(config_name=None):
    """Application factory"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Ensure required directories exist
    os.makedirs(app.config['DOWNLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['TEMP_FOLDER'], exist_ok=True)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # Register blueprints
    from routes.fetch import fetch_bp
    from routes.download import download_bp
    from routes.status import status_bp
    from routes.history import history_bp
    
    app.register_blueprint(fetch_bp, url_prefix='/api')
    app.register_blueprint(download_bp, url_prefix='/api')
    app.register_blueprint(status_bp, url_prefix='/api')
    app.register_blueprint(history_bp, url_prefix='/api')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'ok', 'service': 'MAM Downloader IO'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
