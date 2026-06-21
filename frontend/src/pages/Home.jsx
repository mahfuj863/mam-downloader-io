import { useState } from 'react'
import { motion } from 'framer-motion'
import URLInput from '../components/URLInput'
import ResultsPanel from '../components/ResultsPanel'
import { Zap, Shield, Lightbulb } from 'lucide-react'

const Home = () => {
  const [metadata, setMetadata] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMetadataFetch = (data) => {
    setMetadata(data)
    setIsLoading(false)
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Download in seconds, not minutes',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safe & Secure',
      description: 'No malware, no tracking, privacy first',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Universal Support',
      description: 'Works with 7+ social platforms',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {!metadata && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            MAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">DOWNLOADER</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/70 mb-8"
          >
            Download videos and media from any social platform in seconds
          </motion.p>
        </motion.div>
      )}

      <div className="w-full max-w-5xl">
        {!metadata ? (
          <>
            <URLInput
              onMetadataFetch={handleMetadataFetch}
              isLoading={isLoading}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-dark rounded-xl p-6 border border-neon-blue/20 text-center"
                >
                  <div className="flex justify-center text-neon-blue mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <ResultsPanel metadata={metadata} />
        )}
      </div>
    </div>
  )
}

export default Home
