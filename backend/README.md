# Backend Configuration for MAM DOWNLOADER IO

Flask/FastAPI backend service for universal social media downloader.

## Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Environment Variables

Create `.env` file:

```env
FLASK_ENV=development
FLASK_DEBUG=true
DATABASE_URL=sqlite:///downloads.db
MAX_DOWNLOAD_SIZE=5000  # MB
DOWNLOAD_FOLDER=./downloads
```

## API Endpoints

- POST /api/fetch - Fetch metadata
- POST /api/download - Start download
- GET /api/status/{job_id} - Check progress
- GET /api/history - Get history

## Services

- **ytdlp_service.py** - YouTube/Instagram/TikTok extraction
- **gallery_service.py** - Pinterest/Image extraction
- **platform_detector.py** - URL platform detection
- **download_manager.py** - Download job management
