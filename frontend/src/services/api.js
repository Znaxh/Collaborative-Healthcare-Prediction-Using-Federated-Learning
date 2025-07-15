const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Dashboard endpoints
  async getDashboardMetrics() {
    return this.request('/api/dashboard/metrics')
  }

  async getPerformanceHistory() {
    return this.request('/api/dashboard/performance-history')
  }

  async getHospitalParticipation() {
    return this.request('/api/dashboard/hospital-participation')
  }

  // Hospital endpoints
  async getHospitals() {
    return this.request('/api/hospitals')
  }

  async createHospital(hospitalData) {
    return this.request('/api/hospitals', {
      method: 'POST',
      body: JSON.stringify(hospitalData),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }
}

export const apiService = new ApiService()
export default apiService