import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'
import CursorParticles from './components/CursorParticles'
import Home from './pages/Home'
import Download from './pages/Download'
import Dashboard from './pages/Dashboard'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
          <FloatingParticles count={30} />
          <CursorParticles />
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 relative z-10"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/download" element={<Download />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
