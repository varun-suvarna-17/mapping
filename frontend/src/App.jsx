import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RouteFinder from './pages/RouteFinder'
import AlgorithmComparison from './pages/AlgorithmComparison'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-bg-main text-text-main antialiased selection:bg-primary-orange selection:text-white">
        {/* Glassmorphic Navigation */}
        <Navbar />

        {/* Core Content Container */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-route" element={<RouteFinder />} />
            <Route path="/compare" element={<AlgorithmComparison />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Sleek Dashboard Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

