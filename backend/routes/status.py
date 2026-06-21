from flask import Blueprint, jsonify
from database import Download

status_bp = Blueprint('status', __name__)

@status_bp.route('/status/<job_id>', methods=['GET'])
def get_status(job_id):
    """Get download status"""
    try:
        download = Download.query.get(job_id)
        if not download:
            return jsonify({'error': 'Job not found'}), 404
        
        return jsonify({
            'success': True,
            'job_id': job_id,
            'status': download.status,
            'progress': download.progress,
            'speed': download.speed,
            'eta': download.eta,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
