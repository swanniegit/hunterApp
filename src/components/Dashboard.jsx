function Dashboard({ team, stations, onStationSelect }) {
  const completedCount = stations.filter(s => s.status === 'completed').length
  const progress = (completedCount / stations.length) * 100

  const getStationIcon = (stationId) => {
    const icons = {
      ai: '🤖',
      web: '🌐',
      security: '🔒',
      network: '🌐',
      hardware: '💻',
      support: '🎧',
      data: '📊',
      actuarial: '📈'
    }
    return icons[stationId] || '❓'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-teal-500'
      case 'available': return 'bg-cerise-500'
      case 'locked': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed ✓'
      case 'available': return 'Start Now'
      case 'locked': return 'Locked'
      default: return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
              <p className="text-gray-600">{team.members.join(', ')}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-teal-600">
                Score: {team.progress.totalScore}
              </div>
              <div className="text-sm text-gray-600">
                {completedCount}/{stations.length} Stations Complete
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-teal-500 to-cerise-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% Complete</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Next Station</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
                station.status === 'available' 
                  ? 'hover:shadow-lg cursor-pointer transform hover:scale-105' 
                  : ''
              } ${station.status === 'locked' ? 'opacity-60' : ''}`}
              onClick={() => station.status === 'available' && onStationSelect(station.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{getStationIcon(station.id)}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(station.status)}`}>
                    {getStatusText(station.status)}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {station.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  {getStationDescription(station.id)}
                </p>
                
                {station.status === 'available' && (
                  <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                    Enter Station
                  </button>
                )}
                
                {station.status === 'locked' && (
                  <div className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-md text-center">
                    Complete previous stations to unlock
                  </div>
                )}
                
                {station.status === 'completed' && (
                  <div className="w-full bg-teal-100 text-teal-800 py-2 px-4 rounded-md text-center font-medium">
                    Completed! Score: 100pts
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cerise-600">{team.progress.totalScore}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-500">{stations.length - completedCount}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cerise-500">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function getStationDescription(stationId) {
  const descriptions = {
    ai: 'Solve logic puzzles and interact with AI systems to understand machine learning concepts.',
    web: 'Debug code snippets and build responsive web components using HTML, CSS, and JavaScript.',
    security: 'Identify vulnerabilities and protect systems from cyber threats in this escape room challenge.',
    network: 'Configure network topologies and establish optimal connections between devices.',
    hardware: 'Assemble computer components and understand hardware relationships in virtual challenges.',
    support: 'Resolve customer technical issues using best practices and communication skills.',
    data: 'Analyze datasets, create visualizations, and derive meaningful insights from data.',
    actuarial: 'Calculate risks and premiums using probability and statistical analysis.'
  }
  return descriptions[stationId] || 'Complete challenges related to this IT discipline.'
}

export default Dashboard