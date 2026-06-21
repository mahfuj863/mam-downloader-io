import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, AlertCircle, CheckCircle2 } from 'lucide-react'
import { detectPlatform } from '../utils/platform-detector'
import { fetchMetadata } from '../utils/api'

const URLInput = ({ onMetadataFetch, isLoading }) => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [platform, setPlatform] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setUrl(value)
    setError('')
    if (value) {
      const detected = detectPlatform(value)
      setPlatform(detected)
    } else {
      setPlatform(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    const detected = detectPlatform(url)
    if (!detected) {
      setError('Unsupported platform or invalid URL')
      return
    }

    try {
      const metadata = await fetchMetadata(url)
      onMetadataFetch(metadata)
      setUrl('')
      setPlatform(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch metadata')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="glass-dark rounded-xl p-1 border border-neon-blue/20 focus-within:border-neon-blue/50 focus-within:shadow-neon-blue">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="text-neon-blue text-lg">🔗</div>
              <input
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Paste any social media URL here... (YouTube, Instagram, TikTok, etc.)"
                className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder-white/40"
              />
              {url && platform && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-neon-blue/10 rounded-lg border border-neon-blue/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                  <span className="text-xs text-neon-blue font-medium">{platform.name}</span>
                </motion.div>
              )}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || !url}
          whileHover={!isLoading && url ? { scale: 1.02 } : {}}
          whileTap={!isLoading && url ? { scale: 0.98 } : {}}
          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-dark-950 font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-neon-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <span>Fetch Media Info</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default URLInput
