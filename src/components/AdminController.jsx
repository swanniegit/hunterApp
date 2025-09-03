import { useState, useEffect } from 'react'
import GroupManagement from './GroupManagement'

function AdminController({ teams = [], stations, groups = [], onUpdateTeamStations, onResetTeam, onUpdateGroups, onBack }) {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [viewMode, setViewMode] = useState('overview') // 'overview', 'team-detail', 'station-detail', 'group-management'
  const [selectedStation, setSelectedStation] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [refreshInterval, setRefreshInterval] = useState(5000)

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger data refresh (in real app this would fetch from server)
      console.log('Refreshing admin data...')
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  const getTeamProgress = (team) => {
    const completed = team.completedStations?.length || 0
    const total = 8
    return { completed, total, percentage: (completed / total) * 100 }
  }

  const getStationStats = () => {
    const stationStats = {}
    stations.forEach(station => {
      stationStats[station.id] = {
        name: station.name,
        teamsWorking: teams.filter(t => t.currentStation === station.id).length,
        teamsCompleted: teams.filter(t => t.completedStations?.includes(station.id)).length,
        totalTeams: teams.length,
        averageScore: 0 // Would calculate from actual scores
      }
    })
    return stationStats
  }

  const unlockStationForTeam = (teamId, stationId) => {
    onUpdateTeamStations(teamId, stationId, 'unlock')
  }

  const lockStationForTeam = (teamId, stationId) => {
    onUpdateTeamStations(teamId, stationId, 'lock')
  }

  const resetTeamProgress = (teamId) => {
    if (confirm('Are you sure you want to reset this team\'s progress?')) {
      onResetTeam(teamId)
    }
  }

  const stationStats = getStationStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Event Controller</h1>
              <p className="text-gray-600">IT Scavenger Hunt - Live Monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Refresh:</span>
                <select 
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value={2000}>2s</option>
                  <option value={5000}>5s</option>
                  <option value={10000}>10s</option>
                  <option value={30000}>30s</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {teams.length} Teams Active
              </div>
              <button
                onClick={onBack}
                className="bg-teal-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
              >
                Back to App
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-4 flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'overview' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('group-management')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'group-management' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Physical Groups
            </button>
            <button
              onClick={() => setViewMode('team-detail')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'team-detail' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Team Details
            </button>
            <button
              onClick={() => setViewMode('station-detail')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                viewMode === 'station-detail' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Station Analytics
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-teal-600">{teams.length}</div>
                <div className="text-sm text-gray-600">Active Teams</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-cerise-600">
                  {teams.filter(t => t.currentStation).length}
                </div>
                <div className="text-sm text-gray-600">Teams In Progress</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-teal-500">
                  {teams.reduce((sum, t) => sum + (t.completedStations?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Stations Completed</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-cerise-500">
                  {Math.round(teams.reduce((sum, t) => sum + getTeamProgress(t).percentage, 0) / teams.length) || 0}%
                </div>
                <div className="text-sm text-gray-600">Average Progress</div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Team Progress</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Station</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teams.map(team => {
                      const progress = getTeamProgress(team)
                      return (
                        <tr key={team.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{team.name}</div>
                            <div className="text-sm text-gray-500">ID: {team.id}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{team.members.length} members</div>
                            <div className="text-xs text-gray-500">{team.members.slice(0, 2).join(', ')}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              team.currentStation 
                                ? 'bg-cerise-100 text-cerise-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {team.currentStation || 'None'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-gradient-to-r from-teal-500 to-cerise-500 h-2 rounded-full"
                                  style={{ width: `${progress.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">
                                {progress.completed}/{progress.total}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {team.totalScore || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedTeam(team)}
                                className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => resetTeamProgress(team.id)}
                                className="text-cerise-600 hover:text-cerise-800 text-sm font-medium"
                              >
                                Reset
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Team Detail Mode */}
        {viewMode === 'team-detail' && (
          <div className="space-y-6">
            {/* Team Selector */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedTeam?.id === team.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{team.name}</div>
                    <div className="text-sm text-gray-600">
                      {getTeamProgress(team).completed}/8 stations
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Team Details */}
            {selectedTeam && (
              <TeamDetailPanel 
                team={selectedTeam}
                stations={stations}
                onUnlockStation={unlockStationForTeam}
                onLockStation={lockStationForTeam}
              />
            )}
          </div>
        )}

        {/* Group Management Mode */}
        {viewMode === 'group-management' && (
          <GroupManagement 
            teams={teams}
            onCreateGroups={onUpdateGroups}
            onUpdateGroups={onUpdateGroups}
            existingGroups={groups}
          />
        )}

        {/* Station Analytics Mode */}
        {viewMode === 'station-detail' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(stationStats).map(([stationId, stats]) => (
                <div key={stationId} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{stats.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Teams Working:</span>
                      <span className="text-sm font-medium text-cerise-600">{stats.teamsWorking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="text-sm font-medium text-teal-600">{stats.teamsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completion Rate:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((stats.teamsCompleted / stats.totalTeams) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Team Detail Panel Component
function TeamDetailPanel({ team, stations, onUnlockStation, onLockStation }) {
  const [selectedStation, setSelectedStation] = useState(null)

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
            <p className="text-sm text-gray-600">Members: {team.members.join(', ')}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-teal-600">Score: {team.totalScore || 0}</div>
            <div className="text-sm text-gray-600">
              {team.completedStations?.length || 0}/8 Stations Complete
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-4">Station Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stations.map(station => {
            const isUnlocked = team.unlockedStations?.includes(station.id)
            const isCompleted = team.completedStations?.includes(station.id)
            const isCurrent = team.currentStation === station.id

            return (
              <div
                key={station.id}
                className={`p-4 rounded-lg border-2 ${
                  isCurrent ? 'border-cerise-500 bg-cerise-50' :
                  isCompleted ? 'border-teal-500 bg-teal-50' :
                  isUnlocked ? 'border-blue-300 bg-blue-50' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-medium text-gray-900">{station.name}</h5>
                    <div className="flex space-x-2 mt-1">
                      {isCurrent && (
                        <span className="text-xs bg-cerise-100 text-cerise-800 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                          Completed
                        </span>
                      )}
                      {isUnlocked && !isCompleted && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Available
                        </span>
                      )}
                      {!isUnlocked && !isCompleted && (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!isCompleted && (
                      <>
                        {isUnlocked ? (
                          <button
                            onClick={() => onLockStation(team.id, station.id)}
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                          >
                            Lock
                          </button>
                        ) : (
                          <button
                            onClick={() => onUnlockStation(team.id, station.id)}
                            className="text-xs bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700"
                          >
                            Unlock
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Show answers for current/completed stations */}
                {(isCurrent || isCompleted) && team.stationAnswers?.[station.id] && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h6 className="text-xs font-medium text-gray-700 mb-2">Answers:</h6>
                    <div className="space-y-1">
                      {Object.entries(team.stationAnswers[station.id]).map(([questionId, answer]) => (
                        <div key={questionId} className="text-xs text-gray-600">
                          <span className="font-medium">{questionId}:</span> {answer}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminController