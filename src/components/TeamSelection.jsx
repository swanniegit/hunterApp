import { useState } from 'react'

function TeamSelection({ teams, onTeamSelected, onBackToRegistration }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeamId, setSelectedTeamId] = useState('')

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.members.some(member => 
      member.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleTeamSelect = () => {
    const selectedTeam = teams.find(team => team.id === selectedTeamId)
    if (selectedTeam) {
      onTeamSelected(selectedTeam)
    }
  }

  const getTeamProgress = (team) => {
    const completed = team.completedStations?.length || 0
    const total = 8
    return { completed, total, percentage: (completed / total) * 100 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-cerise-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Select your team to continue the scavenger hunt</p>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No teams have been registered yet.</p>
            <button
              onClick={onBackToRegistration}
              className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
            >
              Register New Team
            </button>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Teams
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search by team name or member name..."
              />
            </div>

            {/* Team List */}
            <div className="mb-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {filteredTeams.map((team) => {
                  const progress = getTeamProgress(team)
                  return (
                    <div
                      key={team.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedTeamId === team.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => setSelectedTeamId(team.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="teamSelection"
                              checked={selectedTeamId === team.id}
                              onChange={() => setSelectedTeamId(team.id)}
                              className="mr-3"
                            />
                            <h3 className="text-lg font-semibold text-gray-900">
                              {team.name}
                            </h3>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Members:</strong> {team.members.join(', ')}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              Progress: {progress.completed}/{progress.total} stations
                            </div>
                            <div className="text-sm font-medium text-teal-600">
                              Score: {team.totalScore || 0} pts
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-cerise-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {filteredTeams.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No teams found matching "{searchTerm}"
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                onClick={onBackToRegistration}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Register New Team
              </button>
              
              <button
                onClick={handleTeamSelect}
                disabled={!selectedTeamId}
                className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Continue as {selectedTeamId ? teams.find(t => t.id === selectedTeamId)?.name : 'Selected Team'}
              </button>
            </div>

            {/* Stats Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-600">{teams.length}</div>
                  <div className="text-sm text-gray-600">Total Teams</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cerise-600">
                    {teams.filter(t => t.completedStations?.length > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Teams Started</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {teams.filter(t => t.completedStations?.length === 8).length}
                  </div>
                  <div className="text-sm text-gray-600">Teams Completed</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TeamSelection