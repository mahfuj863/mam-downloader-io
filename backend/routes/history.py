from flask import Blueprint, jsonify
from database import Download

history_bp = Blueprint('history', __name__)

@history_bp.route('/history', methods=['GET'])
def get_history():
    """Get download history"""
    try:
        downloads = Download.query.order_by(Download.created_at.desc()).limit(100).all()
        
        return jsonify({
            'success': True,
            'history': [d.to_dict() for d in downloads]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@history_bp.route('/history/<item_id>', methods=['DELETE'])
def delete_history_item(item_id):
    """Delete history item"""
    try:
        download = Download.query.get(item_id)
        if not download:
            return jsonify({'error': 'Item not found'}), 404
        
        db.session.delete(download)
        db.session.commit()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
