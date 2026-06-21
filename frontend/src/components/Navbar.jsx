import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, History, Settings, Menu, X } from 'lucide-react'

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass border-b border-neon-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white tracking-tight">
                MAM DOWNLOADER
              </h1>
              <p className="text-xs text-neon-blue">IO</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-neon-blue text-dark-950'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'history'
                  ? 'bg-neon-blue text-dark-950'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4 inline mr-2" />
              History
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-neon-blue/10 mt-2 space-y-2"
          >
            <button
              onClick={() => {
                setCurrentPage('home')
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 rounded-lg text-left hover:bg-white/5"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download
            </button>
            <button
              onClick={() => {
                setCurrentPage('history')
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 rounded-lg text-left hover:bg-white/5"
            >
              <History className="w-4 h-4 inline mr-2" />
              History
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
