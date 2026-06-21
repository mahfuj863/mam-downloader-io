from flask import Blueprint, request, jsonify
from database import db, Download
import uuid

download_bp = Blueprint('download', __name__)

@download_bp.route('/download', methods=['POST'])
def start_download():
    """Start download job"""
    try:
        data = request.get_json()
        url = data.get('url')
        format_id = data.get('format_id')
        quality = data.get('quality')
        
        if not url or not format_id:
            return jsonify({'error': 'URL and format_id are required'}), 400
        
        # Create download job
        job_id = str(uuid.uuid4())
        download = Download(
            id=job_id,
            url=url,
            title=data.get('title', 'Unknown'),
            platform=data.get('platform', 'unknown'),
            quality=quality,
            format_id=format_id,
            status='pending'
        )
        
        db.session.add(download)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'job_id': job_id,
            'status': 'processing'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
