import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Activity, Users, TrendingUp, Shield, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { useDashboardData } from '../hooks/useApi'

const Dashboard = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [metricsRef, metricsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [chartsRef, chartsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const { metrics, performanceHistory, hospitalParticipation, loading, error } = useDashboardData()

  // Fallback data for when API is unavailable
  const fallbackMetrics = {
    accuracy: 0.847,
    f1Score: 0.823,
    participatingHospitals: 12,
    totalHospitals: 15,
    dataPoints: 45678
  }

  const fallbackHistory = [
    { round: 1, accuracy: 0.72, f1Score: 0.68, hospitals: 8 },
    { round: 2, accuracy: 0.75, f1Score: 0.71, hospitals: 10 },
    { round: 3, accuracy: 0.78, f1Score: 0.74, hospitals: 11 },
    { round: 4, accuracy: 0.81, f1Score: 0.77, hospitals: 12 },
    { round: 5, accuracy: 0.83, f1Score: 0.80, hospitals: 12 },
    { round: 6, accuracy: 0.847, f1Score: 0.823, hospitals: 12 },
  ]

  const fallbackParticipation = [
    { name: 'Active', value: 12, color: '#10B981' },
    { name: 'Inactive', value: 3, color: '#6B7280' },
  ]

  // Use API data or fallback
  const currentMetrics = metrics || fallbackMetrics
  const currentHistory = performanceHistory || fallbackHistory
  const currentParticipation = hospitalParticipation || fallbackParticipation

  const currentRound = currentHistory.length
  const totalRounds = 20

  const recentActivity = [
    { id: 1, hospital: 'General Hospital', action: 'Model update received', time: '2 min ago', status: 'success' },
    { id: 2, hospital: 'City Medical Center', action: 'Training completed', time: '5 min ago', status: 'success' },
    { id: 3, hospital: 'Regional Health', action: 'Connection established', time: '8 min ago', status: 'success' },
    { id: 4, hospital: 'Metro Hospital', action: 'Sync in progress', time: '12 min ago', status: 'pending' },
  ]

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, isLoading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={metricsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          {isLoading ? (
            <RefreshCw className="h-6 w-6 text-blue-400 animate-spin" />
          ) : (
            <Icon className="h-6 w-6 text-blue-400" />
          )}
        </div>
        {trend && !isLoading && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend > 0 ? '+' : ''}{(trend * 100).toFixed(1)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">
        {isLoading ? '...' : value}
      </h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </motion.div>
  )

  if (error) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4">Unable to connect to backend API</p>
          <p className="text-sm text-gray-500">Using demo data instead</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section ref={headerRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Federated Learning Dashboard</h1>
                <p className="text-gray-400">Real-time insights into your collaborative AI training network</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className={`inline-flex items-center px-4 py-2 border rounded-lg ${
                  loading ? 'bg-yellow-500/20 border-yellow-500/30' : 
                  error ? 'bg-red-500/20 border-red-500/30' : 
                  'bg-green-500/20 border-green-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    loading ? 'bg-yellow-400 animate-pulse' :
                    error ? 'bg-red-400' :
                    'bg-green-400 animate-pulse'
                  }`}></div>
                  <span className={`font-medium ${
                    loading ? 'text-yellow-400' :
                    error ? 'text-red-400' :
                    'text-green-400'
                  }`}>
                    {loading ? 'Connecting...' : error ? 'Demo Mode' : 'System Online'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Round Status */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Current Training Round</h2>
                <span className="text-gray-400 text-sm">
                  {loading ? 'Loading...' : error ? 'Demo data' : 'Live data'}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-white mr-4">Round {currentRound} of {totalRounds}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-3 mr-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(currentRound / totalRounds) * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 text-sm">{Math.round((currentRound / totalRounds) * 100)}%</span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <Shield className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Your data never leaves your system</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Metrics Grid */}
        <section ref={metricsRef} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={TrendingUp}
              title="Global Model Accuracy"
              value={loading ? '...' : `${(currentMetrics.accuracy * 100).toFixed(1)}%`}
              trend={!loading && !error ? 0.024 : null}
              subtitle="vs previous round"
              isLoading={loading}
            />
            <StatCard
              icon={Activity}
              title="F1 Score"
              value={loading ? '...' : currentMetrics.f1Score.toFixed(3)}
              trend={!loading && !error ? 0.018 : null}
              subtitle="Precision & Recall"
              isLoading={loading}
            />
            <StatCard
              icon={Users}
              title="Active Hospitals"
              value={loading ? '...' : `${currentMetrics.participatingHospitals}/${currentMetrics.totalHospitals}`}
              subtitle="Currently participating"
              isLoading={loading}
            />
            <StatCard
              icon={Shield}
              title="Data Points"
              value={loading ? '...' : currentMetrics.dataPoints.toLocaleString()}
              subtitle="Federated training samples"
              isLoading={loading}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section ref={chartsRef} className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance History Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Model Performance History
                {loading && <RefreshCw className="inline h-4 w-4 ml-2 animate-spin" />}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="round" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="f1Score" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Hospital Participation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Hospital Participation
                {loading && <RefreshCw className="inline h-4 w-4 ml-2 animate-spin" />}
              </h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentParticipation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {currentParticipation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {currentParticipation.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-400 text-sm">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 ${
                      activity.status === 'success' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.hospital}</p>
                      <p className="text-gray-400 text-sm">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
