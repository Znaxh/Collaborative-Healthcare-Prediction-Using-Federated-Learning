import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Shield, Users, Download, Upload, RefreshCw, Lock, CheckCircle, ArrowRight } from 'lucide-react'

const HowItWorks = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [stepsRef, stepsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [diagramRef, diagramInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const steps = [
    {
      number: 1,
      title: 'Download & Install',
      description: 'Hospitals download our secure client software and install it on their local systems.',
      icon: Download,
      details: [
        'No data leaves your premises',
        'HIPAA compliant installation',
        'Works with existing infrastructure'
      ]
    },
    {
      number: 2,
      title: 'Local Training',
      description: 'Each hospital trains the AI model using their own patient data locally.',
      icon: RefreshCw,
      details: [
        'Training happens on your hardware',
        'Patient data remains private',
        'Automated model optimization'
      ]
    },
    {
      number: 3,
      title: 'Share Model Updates',
      description: 'Only encrypted model parameters are shared with the central server.',
      icon: Upload,
      details: [
        'No raw data is transmitted',
        'Differential privacy protection',
        'End-to-end encryption'
      ]
    },
    {
      number: 4,
      title: 'Global Aggregation',
      description: 'The central server combines all model updates to create an improved global model.',
      icon: Server,
      details: [
        'Advanced aggregation algorithms',
        'Bias detection and correction',
        'Quality assurance checks'
      ]
    },
    {
      number: 5,
      title: 'Model Distribution',
      description: 'The improved global model is sent back to all participating hospitals.',
      icon: Download,
      details: [
        'Automatic model updates',
        'Version control and rollback',
        'Performance monitoring'
      ]
    },
    {
      number: 6,
      title: 'Continuous Improvement',
      description: 'The process repeats, continuously improving model accuracy and robustness.',
      icon: CheckCircle,
      details: [
        'Iterative learning process',
        'Real-time performance tracking',
        'Collaborative intelligence'
      ]
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Privacy Preserved',
      description: 'Patient data never leaves your hospital. Only model updates are shared.'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Benefit from the collective knowledge of multiple healthcare institutions.'
    },
    {
      icon: Lock,
      title: 'Secure by Design',
      description: 'End-to-end encryption and differential privacy protect all communications.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section ref={headerRef} className="py-24 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Federated Learning Works
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Understand how our privacy-preserving AI system enables hospitals to collaborate
              on machine learning without sharing sensitive patient data.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <Shield className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-medium">Data stays local — only model updates are shared</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section ref={diagramRef} className="py-24 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={diagramInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Federated Learning Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A visual representation of how data stays secure while models get smarter
            </p>
          </motion.div>

          {/* Simplified Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={diagramInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-gray-900/50 rounded-xl p-8 border border-gray-700"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Hospitals */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-lg font-semibold text-white text-center">Participating Hospitals</h3>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={diagramInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className="flex items-center space-x-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Hospital {i}</p>
                      <p className="text-gray-400 text-sm">Local training</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Arrows */}
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={diagramInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center space-x-2"
                >
                  <ArrowRight className="h-6 w-6 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Model Updates</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={diagramInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-purple-400 text-sm font-medium">Global Model</span>
                  <ArrowRight className="h-6 w-6 text-purple-400 rotate-180" />
                </motion.div>
              </div>

              {/* Central Server */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={diagramInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6"
              >
                <div className="text-center">
                  <div className="p-4 bg-purple-500/20 rounded-full mx-auto mb-4 w-fit">
                    <Server className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Central Server</h3>
                  <p className="text-gray-400 text-sm mb-4">Aggregates model updates</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• No patient data stored</p>
                    <p>• Encrypted communications</p>
                    <p>• Model optimization</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section ref={stepsRef} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Step-by-Step Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Follow the journey of how federated learning creates better AI models while keeping your data secure
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Content */}
                <div className="flex-1 bg-gray-900/50 rounded-xl p-8 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mr-4">
                      <span className="text-blue-400 font-bold text-lg">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <step.icon className="h-12 w-12 text-blue-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Why Federated Learning?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The perfect balance between collaboration and privacy for healthcare AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="p-4 bg-blue-500/20 rounded-full mx-auto mb-6 w-fit">
                  <benefit.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
