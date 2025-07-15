import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { apiService } from '../services/api'

const BackendStatus = () => {
  const [status, setStatus] = useState('checking')
  const [lastCheck, setLastCheck] = useState(null)

  const checkBackendHealth = async () => {
    try {
      setStatus('checking')
      await apiService.healthCheck()
      setStatus('connected')
      setLastCheck(new Date())
    } catch (error) {
      setStatus('disconnected')
      setLastCheck(new Date())
    }
  }

  useEffect(() => {
    checkBackendHealth()
    const interval = setInterval(checkBackendHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'connected':
        return <CheckCircle className="h-4 w-4" />
      case 'disconnected':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <RefreshCw className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return 'text-yellow-400'
      case 'connected':
        return 'text-green-400'
      case 'disconnected':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return 'Checking...'
      case 'connected':
        return 'Backend Connected'
      case 'disconnected':
        return 'Backend Offline'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-sm font-medium">{getStatusText()}</span>
      {lastCheck && (
        <span className="text-xs text-gray-500">
          {lastCheck.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}

export default BackendStatus