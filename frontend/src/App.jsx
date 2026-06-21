import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import BackgroundAnimation from './components/BackgroundAnimation'
import Home from './pages/Home'
import History from './pages/History'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      <BackgroundAnimation />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="relative z-10">
        {currentPage === 'home' ? <Home /> : <History />}
      </main>
    </div>
  )
}

export default App
