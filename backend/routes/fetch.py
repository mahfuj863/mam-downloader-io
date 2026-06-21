from flask import Blueprint, request, jsonify
from services.platform_detector import PlatformDetector
from services.ytdlp_service import YTDLPService

fetch_bp = Blueprint('fetch', __name__)

@fetch_bp.route('/fetch', methods=['POST'])
def fetch_metadata():
    """Fetch metadata from URL"""
    try:
        data = request.get_json()
        url = data.get('url')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Detect platform
        platform = PlatformDetector.detect(url)
        if not platform:
            return jsonify({'error': 'Unsupported platform'}), 400
        
        # Extract metadata
        if platform['platform'] in ['youtube', 'instagram', 'tiktok', 'facebook', 'reddit', 'threads']:
            service = YTDLPService()
            info = service.extract_info(url)
            formats = service.get_formats(url)
        else:
            return jsonify({'error': 'Platform not yet supported'}), 400
        
        if 'error' in info:
            return jsonify({'error': info['error']}), 400
        
        return jsonify({
            'success': True,
            'url': url,
            'platform': platform['platform'],
            'title': info.get('title'),
            'description': info.get('description'),
            'duration': info.get('duration'),
            'thumbnail': info.get('thumbnail'),
            'uploader': info.get('uploader'),
            'formats': formats,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
