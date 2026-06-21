from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class Download(db.Model):
    """Download history model"""
    __tablename__ = 'downloads'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    url = db.Column(db.String(500), nullable=False, index=True)
    title = db.Column(db.String(255), nullable=False)
    platform = db.Column(db.String(50), nullable=False, index=True)
    quality = db.Column(db.String(50), nullable=False)
    format_id = db.Column(db.String(50), nullable=False)
    file_path = db.Column(db.String(500))
    file_size = db.Column(db.Integer)  # in bytes
    status = db.Column(db.String(50), default='pending', index=True)  # pending, downloading, completed, failed
    progress = db.Column(db.Float, default=0.0)
    speed = db.Column(db.String(50))  # e.g., "2.5 MB/s"
    eta = db.Column(db.Integer)  # in seconds
    error_message = db.Column(db.Text)
    thumbnail = db.Column(db.String(500))
    duration = db.Column(db.Integer)  # in seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'platform': self.platform,
            'quality': self.quality,
            'status': self.status,
            'progress': self.progress,
            'speed': self.speed,
            'eta': self.eta,
            'file_path': self.file_path,
            'file_size': self.file_size,
            'thumbnail': self.thumbnail,
            'duration': self.duration,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
        }
