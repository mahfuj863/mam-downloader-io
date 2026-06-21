# 🎬 MAM DOWNLOADER IO

> **Premium Universal Social Media Downloader Platform**

A production-ready, SaaS-style web application for downloading videos and media from multiple social platforms with a stunning modern UI, glassmorphism effects, and smooth animations.

## 🌟 Features

### Core Functionality
- ✅ **Universal URL Support**: YouTube, Instagram, TikTok, Facebook, Reddit, Pinterest, Threads
- ✅ **Auto Platform Detection**: Intelligent URL parsing and platform identification
- ✅ **Multiple Quality Options**: 360p, 480p, 720p, 1080p, 4K, Audio-only (MP3/M4A)
- ✅ **Smart Metadata Extraction**: Title, thumbnail, duration, available formats
- ✅ **Download Management**: Progress tracking, pause/resume, speed indicators, ETA
- ✅ **Download History**: Track and re-download previous downloads
- ✅ **Fast Processing**: Sub-2 second metadata fetch times

### Design & UX
- 🎨 **Premium Dark Mode**: Modern glassmorphism and neon accents
- ✨ **Smooth Animations**: Framer Motion transitions and interactions
- 🌐 **3D UI Effects**: CSS 3D transforms and animated particles
- 📱 **Fully Responsive**: Desktop, tablet, and mobile optimized
- 🎯 **Intuitive Interface**: Minimal clicks to download media

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.9+
- ffmpeg
- yt-dlp

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python app.py
```

## 📁 Project Structure

```
mam-downloader-io/
├── frontend/          # React.js SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── styles/
│   └── package.json
└── backend/           # Flask REST API
    ├── routes/
    ├── services/
    ├── database/
    └── app.py
```

## 🔌 API Endpoints

- **POST /api/fetch** - Fetch metadata and formats
- **POST /api/download** - Start download
- **GET /api/status/{job_id}** - Check download progress
- **GET /api/history** - Get download history

## 📚 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion
- **Backend**: Flask, yt-dlp, gallery-dl, ffmpeg
- **Database**: SQLite
- **Deployment**: Vercel (frontend), Render/Railway (backend)

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ by MAM DOWNLOADER IO Team**