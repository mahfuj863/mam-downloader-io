import subprocess
import json
import re
from pathlib import Path

class YTDLPService:
    """yt-dlp extraction service"""
    
    def __init__(self):
        self.ydl_opts_base = {
            'quiet': False,
            'no_warnings': False,
        }
    
    def extract_info(self, url):
        """Extract metadata from URL"""
        try:
            import yt_dlp
            
            ydl_opts = {
                **self.ydl_opts_base,
                'extract_flat': 'in_playlist',
                'skip_download': True,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
            
            return self._format_info(info)
        except Exception as e:
            return {'error': str(e)}
    
    def get_formats(self, url):
        """Get available formats"""
        try:
            import yt_dlp
            
            ydl_opts = {
                **self.ydl_opts_base,
                'skip_download': True,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
            
            formats = []
            if 'formats' in info:
                for fmt in info['formats']:
                    format_dict = {
                        'format_id': fmt.get('format_id'),
                        'format_note': fmt.get('format_note', ''),
                        'height': fmt.get('height'),
                        'width': fmt.get('width'),
                        'fps': fmt.get('fps'),
                        'vcodec': fmt.get('vcodec'),
                        'acodec': fmt.get('acodec'),
                        'filesize': fmt.get('filesize'),
                    }
                    formats.append(format_dict)
            
            return formats
        except Exception as e:
            return {'error': str(e)}
    
    def download(self, url, format_id, output_path):
        """Download video"""
        try:
            import yt_dlp
            
            ydl_opts = {
                **self.ydl_opts_base,
                'format': format_id,
                'outtmpl': output_path,
                'quiet': False,
                'no_warnings': False,
                'progress_hooks': [],
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
            
            return {'success': True, 'info': info}
        except Exception as e:
            return {'error': str(e)}
    
    @staticmethod
    def _format_info(info):
        """Format extracted info"""
        return {
            'title': info.get('title'),
            'description': info.get('description'),
            'duration': info.get('duration'),
            'uploader': info.get('uploader'),
            'thumbnail': info.get('thumbnail'),
            'upload_date': info.get('upload_date'),
            'view_count': info.get('view_count'),
            'like_count': info.get('like_count'),
        }
