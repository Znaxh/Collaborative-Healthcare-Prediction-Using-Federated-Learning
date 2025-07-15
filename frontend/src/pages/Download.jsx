import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download as DownloadIcon, Monitor, Smartphone, Server, Copy, Check, Terminal, Package } from 'lucide-react'
import { useState } from 'react'

const Download = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [downloadsRef, downloadsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [copiedCommand, setCopiedCommand] = useState('')

  const downloadOptions = [
    {
      platform: 'Linux',
      icon: Terminal,
      description: 'Debian/Ubuntu package for easy installation',
      downloadType: '.deb Package',
      downloadSize: '45 MB',
      downloadUrl: '#',
      installCommands: [
        'wget https://releases.fedhealth.ai/fedhealth-client_1.0.0_amd64.deb',
        'sudo dpkg -i fedhealth-client_1.0.0_amd64.deb',
        'sudo apt-get install -f',
        'fedhealth-client --version'
      ]
    },
    {
      platform: 'Windows',
      icon: Monitor,
      description: 'Windows installer with GUI setup wizard',
      downloadType: '.exe Installer',
      downloadSize: '52 MB',
      downloadUrl: '#',
      installCommands: [
        '1. Download fedhealth-client-setup.exe',
        '2. Right-click and "Run as administrator"',
        '3. Follow the installation wizard',
        '4. Launch from Start Menu or Desktop'
      ]
    },
    {
      platform: 'Docker',
      icon: Package,
      description: 'Containerized solution for any environment',
      downloadType: 'Docker Image',
      downloadSize: '380 MB',
      downloadUrl: '#',
      installCommands: [
        'docker pull fedhealth/client:latest',
        'docker run -d --name fedhealth-client \\',
        '  -v /path/to/data:/app/data \\',
        '  fedhealth/client:latest'
      ]
    }
  ]

  const copyToClipboard = (text, commandIndex) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(`${commandIndex}`)
    setTimeout(() => setCopiedCommand(''), 2000)
  }

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
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-full">
                <DownloadIcon className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Download Local Training Software
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get started with federated learning by downloading our client software.
              Choose the version that works best for your hospital's infrastructure.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-green-400 font-medium">Latest Version: v1.0.0</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Options */}
      <section ref={downloadsRef} className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={downloadsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Platform</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our client software is available for multiple platforms. Select the one that matches your system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {downloadOptions.map((option, index) => (
              <motion.div
                key={option.platform}
                initial={{ opacity: 0, y: 30 }}
                animate={downloadsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center mb-4">
                    <option.icon className="h-8 w-8 text-blue-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">{option.platform}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{option.downloadType}</span>
                    <span>{option.downloadSize}</span>
                  </div>
                </div>

                {/* Download Button */}
                <div className="p-6 border-b border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <DownloadIcon className="mr-2 h-5 w-5" />
                    Download for {option.platform}
                  </motion.button>
                </div>

                {/* Installation Instructions */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Installation Instructions</h4>
                  <div className="space-y-3">
                    {option.installCommands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="group">
                        <div className="flex items-start justify-between bg-gray-800 rounded-lg p-3">
                          <code className="text-sm text-gray-300 flex-1 font-mono">
                            {command}
                          </code>
                          {option.platform !== 'Windows' && (
                            <button
                              onClick={() => copyToClipboard(command, `${index}-${cmdIndex}`)}
                              className="ml-2 p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                            >
                              {copiedCommand === `${index}-${cmdIndex}` ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">System Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Minimum Requirements</h3>
                <ul className="text-gray-400 space-y-2 text-left">
                  <li>• 4 GB RAM</li>
                  <li>• 2 CPU cores</li>
                  <li>• 10 GB free disk space</li>
                  <li>• Internet connection</li>
                  <li>• Python 3.8+ (for Docker)</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Recommended</h3>
                <ul className="text-gray-400 space-y-2 text-left">
                  <li>• 8 GB RAM or more</li>
                  <li>• 4+ CPU cores</li>
                  <li>• 50 GB free disk space</li>
                  <li>• Stable broadband connection</li>
                  <li>• GPU support (optional)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Download
