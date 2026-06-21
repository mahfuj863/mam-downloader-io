import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Loader, CheckCircle2, AlertCircle } from 'lucide-react'
import { startDownload } from '../utils/api'
import { storageManager } from '../utils/storage'

const ResultsPanel = ({ metadata }) => {
  const [selectedQuality, setSelectedQuality] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState(null)
  const [error, setError] = useState('')

  const qualityOptions = [
    { id: 'best', label: '4K (Best)', icon: '🎬' },
    { id: '1080p', label: '1080p HD', icon: '📹' },
    { id: '720p', label: '720p HD', icon: '📺' },
    { id: '480p', label: '480p', icon: '📱' },
    { id: '360p', label: '360p', icon: '📞' },
    { id: 'audio', label: 'Audio Only (MP3)', icon: '🎵' },
  ]

  const handleDownload = async (quality) => {
    if (!metadata.url) return

    setIsDownloading(true)
    setError('')
    setSelectedQuality(quality)

    try {
      const result = await startDownload(metadata.url, quality.id, quality.label)
      setDownloadStatus({ success: true, jobId: result.job_id })
      
      storageManager.addToHistory({
        url: metadata.url,
        title: metadata.title,
        platform: metadata.platform,
        quality: quality.label,
        thumbnail: metadata.thumbnail,
      })
    } catch (err) {
      setError(err.message || 'Download failed')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="md:col-span-1">
          <div className="glass-dark rounded-xl overflow-hidden aspect-video shadow-lg">
            {metadata.thumbnail && (
              <img
                src={metadata.thumbnail}
                alt={metadata.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </motion.div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{metadata.title}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-full text-xs font-medium text-neon-blue">
                {metadata.platform?.toUpperCase()}
              </span>
              {metadata.duration && (
                <span className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 rounded-full text-xs font-medium text-neon-purple">
                  ⏱️ {Math.floor(metadata.duration / 60)}m {metadata.duration % 60}s
                </span>
              )}
            </div>
          </div>

          {metadata.description && (
            <p className="text-white/70 text-sm line-clamp-3">{metadata.description}</p>
          )}
        </div>
      </div>

      <div className="glass-dark rounded-xl p-6 border border-neon-blue/20">
        <h3 className="text-lg font-bold text-white mb-4">Select Quality</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {qualityOptions.map((quality) => (
            <motion.button
              key={quality.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload(quality)}
              disabled={isDownloading}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedQuality?.id === quality.id && isDownloading
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-neon-blue/20 bg-dark-900/50 hover:border-neon-blue/50 hover:bg-dark-900'
              }`}
            >
              <div className="text-2xl mb-1">{quality.icon}</div>
              <div className="text-xs font-bold text-white">{quality.label}</div>
              {selectedQuality?.id === quality.id && isDownloading && (
                <Loader className="w-4 h-4 animate-spin absolute top-2 right-2 text-neon-blue" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {downloadStatus?.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
          >
            <CheckCircle2 className="w-5 h-5" />
            Download started! Job ID: {downloadStatus.jobId.slice(0, 8)}...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResultsPanel
