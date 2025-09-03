import { useState } from 'react'

function GroupManagement({ teams, onCreateGroups, onUpdateGroups, existingGroups = [] }) {
  const [groupSize, setGroupSize] = useState(4)
  const [groups, setGroups] = useState(existingGroups)
  const [selectedTeams, setSelectedTeams] = useState([])

  const createRandomGroups = () => {
    const availableTeams = [...teams]
    const newGroups = []
    let groupId = 1

    // Shuffle teams randomly
    for (let i = availableTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[availableTeams[i], availableTeams[j]] = [availableTeams[j], availableTeams[i]]
    }

    // Create groups of specified size
    while (availableTeams.length > 0) {
      const groupTeams = availableTeams.splice(0, groupSize)
      newGroups.push({
        id: `group-${groupId}`,
        name: `Physical Group ${groupId}`,
        teams: groupTeams,
        members: groupTeams.flatMap(team => team.members),
        unlockedStations: [],
        currentStation: null,
        stationProgress: {},
        createdAt: new Date().toISOString()
      })
      groupId++
    }

    setGroups(newGroups)
    onCreateGroups(newGroups)
  }

  const createCustomGroup = () => {
    if (selectedTeams.length < 2) {
      alert('Please select at least 2 teams for a custom group')
      return
    }

    const customGroup = {
      id: `group-custom-${Date.now()}`,
      name: `Custom Group ${groups.length + 1}`,
      teams: selectedTeams.map(teamId => teams.find(t => t.id === teamId)),
      members: selectedTeams.flatMap(teamId => 
        teams.find(t => t.id === teamId)?.members || []
      ),
      unlockedStations: [],
      currentStation: null,
      stationProgress: {},
      createdAt: new Date().toISOString()
    }

    setGroups(prev => [...prev, customGroup])
    setSelectedTeams([])
    onCreateGroups([...groups, customGroup])
  }

  const deleteGroup = (groupId) => {
    if (confirm('Are you sure you want to delete this group?')) {
      const updatedGroups = groups.filter(g => g.id !== groupId)
      setGroups(updatedGroups)
      onUpdateGroups(updatedGroups)
    }
  }

  const getUnassignedTeams = () => {
    const assignedTeamIds = groups.flatMap(group => group.teams.map(team => team.id))
    return teams.filter(team => !assignedTeamIds.includes(team.id))
  }

  const unassignedTeams = getUnassignedTeams()

  return (
    <div className="space-y-6">
      {/* Group Creation Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Physical Groups</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Random Groups */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Random Grouping</h4>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Group Size:</label>
              <select 
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value={3}>3 teams per group</option>
                <option value={4}>4 teams per group</option>
                <option value={5}>5 teams per group</option>
              </select>
            </div>
            <button
              onClick={createRandomGroups}
              disabled={teams.length < 2}
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:bg-gray-300"
            >
              Create Random Groups
            </button>
            <p className="text-xs text-gray-500">
              Will create {Math.ceil(teams.length / groupSize)} groups from {teams.length} teams
            </p>
          </div>

          {/* Custom Groups */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Custom Grouping</h4>
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Select Teams:</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                {unassignedTeams.map(team => (
                  <label key={team.id} className="flex items-center space-x-2 p-1">
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTeams([...selectedTeams, team.id])
                        } else {
                          setSelectedTeams(selectedTeams.filter(id => id !== team.id))
                        }
                      }}
                    />
                    <span className="text-sm">{team.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={createCustomGroup}
              disabled={selectedTeams.length < 2}
              className="w-full bg-cerise-600 text-white py-2 px-4 rounded-md hover:bg-cerise-700 disabled:bg-gray-300"
            >
              Create Custom Group ({selectedTeams.length} teams)
            </button>
          </div>
        </div>
      </div>

      {/* Existing Groups */}
      {groups.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Physical Groups ({groups.length})</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {groups.map(group => (
                <div key={group.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{group.name}</h4>
                      <p className="text-sm text-gray-600">
                        {group.teams.length} teams • {group.members.length} members total
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                        {group.unlockedStations?.length || 0} stations unlocked
                      </span>
                      <button
                        onClick={() => deleteGroup(group.id)}
                        className="text-cerise-600 hover:text-cerise-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Teams in Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.teams.map(team => (
                      <div key={team.id} className="bg-gray-50 rounded p-3">
                        <div className="font-medium text-sm text-gray-900">{team.name}</div>
                        <div className="text-xs text-gray-600">
                          {team.members.join(', ')}
                        </div>
                        <div className="text-xs text-teal-600 mt-1">
                          Score: {team.totalScore || 0} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Unassigned Teams */}
      {unassignedTeams.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">
            Unassigned Teams ({unassignedTeams.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {unassignedTeams.map(team => (
              <div key={team.id} className="text-sm text-yellow-700">
                {team.name} ({team.members.length} members)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupManagement