import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause2, Play, X, Zap } from 'lucide-react'
import { getDownloadStatus } from '../utils/api'

const DownloadManager = ({ jobId, onComplete }) => {
  const [status, setStatus] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const data = await getDownloadStatus(jobId)
        setStatus(data)
        if (data.status === 'completed') {
          onComplete?.()
        }
      } catch (err) {
        console.error('Failed to get download status:', err)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [jobId, onComplete])

  if (!status) return null

  const progress = status.progress || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-xl p-6 border border-neon-blue/20 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Download Manager</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-white/70">Progress</span>
          <span className="text-neon-blue font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden border border-neon-blue/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-dark-900/50 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1">Speed</div>
          <div className="text-sm font-bold text-neon-blue flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {status.speed || '0 MB/s'}
          </div>
        </div>
        <div className="bg-dark-900/50 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1">ETA</div>
          <div className="text-sm font-bold text-neon-purple">
            {status.eta ? `${status.eta}s` : '---'}
          </div>
        </div>
        <div className="bg-dark-900/50 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1">Status</div>
          <div className="text-sm font-bold text-white capitalize">
            {status.status}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPaused(!isPaused)}
          className="flex-1 py-2 bg-neon-purple/20 border border-neon-purple/30 rounded-lg text-neon-purple font-medium flex items-center justify-center gap-2 hover:bg-neon-purple/30"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause2 className="w-4 h-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default DownloadManager
