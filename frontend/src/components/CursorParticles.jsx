import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CursorParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])
  const [isMoving, setIsMoving] = useState(false)
  const rippleIdRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set timeout to stop moving state
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 150)
    }

    const handleClick = (e) => {
      // Create ripple effect on click
      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }

      setRipples(prev => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('click', handleClick)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full pointer-events-none bg-blue-400 mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.1,
        }}
      />

      {/* Outer ring that follows cursor */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none border border-blue-400/40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isMoving ? 1.5 : 1,
          opacity: isMoving ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.3,
        }}
      />

      {/* Trailing glow effect */}
      <motion.div
        className="absolute w-12 h-12 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
          filter: 'blur(6px)',
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isMoving ? 1.3 : 0.8,
          opacity: isMoving ? 0.6 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 30,
          mass: 0.5,
        }}
      />

      {/* Click ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none border-2 border-blue-400/60"
            style={{
              left: ripple.x - 2,
              top: ripple.y - 2,
            }}
            initial={{
              width: 4,
              height: 4,
              opacity: 0.8,
            }}
            animate={{
              width: 60,
              height: 60,
              opacity: 0,
              x: -28,
              y: -28,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Secondary ripple for depth */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={`secondary-${ripple.id}`}
            className="absolute rounded-full pointer-events-none border border-green-400/40"
            style={{
              left: ripple.x - 1,
              top: ripple.y - 1,
            }}
            initial={{
              width: 2,
              height: 2,
              opacity: 0.6,
            }}
            animate={{
              width: 40,
              height: 40,
              opacity: 0,
              x: -19,
              y: -19,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Magnetic field effect */}
      <motion.div
        className="absolute w-16 h-16 rounded-full pointer-events-none border border-purple-400/20"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          rotate: isMoving ? 180 : 0,
          scale: isMoving ? 1.1 : 0.9,
          opacity: isMoving ? 0.3 : 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8,
          rotate: {
            duration: 2,
            ease: "linear",
            repeat: isMoving ? Infinity : 0,
          }
        }}
      />
    </div>
  )
}

export default CursorParticles
