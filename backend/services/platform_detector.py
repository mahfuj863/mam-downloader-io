import re
from urllib.parse import urlparse

class PlatformDetector:
    """Detect platform from URL"""
    
    PATTERNS = {
        'youtube': {
            'regex': r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)',
            'name': 'YouTube',
            'extractor': 'youtube',
        },
        'instagram': {
            'regex': r'instagram\.com\/(?:p|reel)\/([\w-]+)',
            'name': 'Instagram',
            'extractor': 'instagram',
        },
        'tiktok': {
            'regex': r'(?:tiktok\.com\/.*v=|vm\.tiktok\.com\/)([\w]+)',
            'name': 'TikTok',
            'extractor': 'tiktok',
        },
        'facebook': {
            'regex': r'facebook\.com\/(?:watch\/\?v=|.*\/videos\/)([\d]+)',
            'name': 'Facebook',
            'extractor': 'facebook',
        },
        'reddit': {
            'regex': r'reddit\.com\/r\/\w+\/comments\/(\w+)',
            'name': 'Reddit',
            'extractor': 'reddit',
        },
        'pinterest': {
            'regex': r'pinterest\.com\/pin\/(\d+)',
            'name': 'Pinterest',
            'extractor': 'pinterest',
        },
        'threads': {
            'regex': r'threads\.net\/.*\/(\w+)',
            'name': 'Threads',
            'extractor': 'threads',
        },
    }
    
    @staticmethod
    def detect(url):
        """Detect platform from URL"""
        try:
            urlparse(url)
        except:
            return None
        
        for platform, config in PlatformDetector.PATTERNS.items():
            if re.search(config['regex'], url):
                return {
                    'platform': platform,
                    'name': config['name'],
                    'extractor': config['extractor'],
                }
        
        return None
    
    @staticmethod
    def is_supported(url):
        """Check if URL is supported"""
        return PlatformDetector.detect(url) is not None
