import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Trash2, Heart } from 'lucide-react'
import { storageManager } from '../utils/storage'

const HistoryPanel = () => {
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const hist = storageManager.getHistory()
    setHistory(hist)
  }, [])

  const handleDelete = (itemId) => {
    storageManager.removeFromHistory(itemId)
    setHistory(history.filter((item) => item.id !== itemId))
  }

  const handleToggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId))
    } else {
      setFavorites([...favorites, itemId])
    }
  }

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="text-5xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Downloads Yet</h2>
        <p className="text-white/50">Your download history will appear here</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Download History</h2>
      <div className="grid gap-4">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className="glass-dark rounded-xl p-4 border border-neon-blue/20 flex items-center gap-4 hover:border-neon-blue/50 transition-all"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="px-2 py-1 bg-neon-blue/10 rounded text-neon-blue capitalize">
                    {item.platform}
                  </span>
                  <span>{item.quality}</span>
                  {item.timestamp && (
                    <span>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleFavorite(item.id)}
                  className={`p-2 rounded-lg transition-all ${
                    favorites.includes(item.id)
                      ? 'bg-neon-purple/20 text-neon-purple'
                      : 'bg-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default HistoryPanel
