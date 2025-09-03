import { useState } from 'react'

function TeamRegistration({ onTeamRegistered, onBackToLogin }) {
  const [teamName, setTeamName] = useState('')
  const [members, setMembers] = useState(['', '', '', ''])
  const [errors, setErrors] = useState({})

  const handleMemberChange = (index, value) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const addMember = () => {
    if (members.length < 5) {
      setMembers([...members, ''])
    }
  }

  const removeMember = (index) => {
    if (members.length > 2) {
      const newMembers = members.filter((_, i) => i !== index)
      setMembers(newMembers)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required'
    }
    
    const filledMembers = members.filter(member => member.trim())
    if (filledMembers.length < 2) {
      newErrors.members = 'At least 2 team members required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    const team = {
      name: teamName,
      members: filledMembers,
      id: Date.now().toString(),
      progress: {
        completedStations: 0,
        totalScore: 0,
        currentStation: null
      }
    }
    
    onTeamRegistered(team)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-cerise-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">IT Scavenger Hunt</h1>
          <p className="text-gray-600">Register your team to begin the adventure!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your team name"
            />
            {errors.teamName && (
              <p className="mt-1 text-sm text-red-600">{errors.teamName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Members (2-5 people)
            </label>
            {members.map((member, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Member ${index + 1} name`}
                />
                {members.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="ml-2 px-3 py-2 bg-cerise-500 text-white rounded-md hover:bg-cerise-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            {members.length < 5 && (
              <button
                type="button"
                onClick={addMember}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                + Add Member
              </button>
            )}
            
            {errors.members && (
              <p className="mt-1 text-sm text-red-600">{errors.members}</p>
            )}
          </div>

          <div className="flex space-x-4">
            {onBackToLogin && (
              <button
                type="button"
                onClick={onBackToLogin}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 font-medium"
              >
                ← Back to Login
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              Start Adventure
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamRegistration