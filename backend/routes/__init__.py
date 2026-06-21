# Routes module
from .fetch import fetch_bp
from .download import download_bp
from .status import status_bp
from .history import history_bp

__all__ = ['fetch_bp', 'download_bp', 'status_bp', 'history_bp']
