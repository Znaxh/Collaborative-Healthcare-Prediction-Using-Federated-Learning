import { useState, useEffect } from 'react'

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        setData(result)
      } catch (err) {
        setError(err.message)
        console.error('API call failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState(null)
  const [performanceHistory, setPerformanceHistory] = useState(null)
  const [hospitalParticipation, setHospitalParticipation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { apiService } = await import('../services/api')
        
        const [metricsData, historyData, participationData] = await Promise.all([
          apiService.getDashboardMetrics(),
          apiService.getPerformanceHistory(),
          apiService.getHospitalParticipation()
        ])

        setMetrics(metricsData)
        setPerformanceHistory(historyData)
        setHospitalParticipation(participationData)
      } catch (err) {
        setError(err.message)
        console.error('Dashboard data fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  return {
    metrics,
    performanceHistory,
    hospitalParticipation,
    loading,
    error
  }
}