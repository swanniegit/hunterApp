// LEGO BUILDER - Login Screen Component
// Secure authentication for teams and admins

import { useState } from 'react'

function LoginScreen({ teams, onTeamLogin, onAdminLogin, onGoToRegistration }) {
  const [loginType, setLoginType] = useState('team') // 'team' or 'admin'
  
  // Debug logging
  console.log('LoginScreen received teams:', teams, 'type:', typeof teams, 'isArray:', Array.isArray(teams))
  const [teamId, setTeamId] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleTeamLogin = (e) => {
    e.preventDefault()
    onTeamLogin(teamId, password)
  }

  const handleAdminLogin = (e) => {
    e.preventDefault() 
    onAdminLogin(username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-cerise-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">IT Scavenger Hunt</h1>
          <p className="text-gray-600">Please login to continue</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setLoginType('team')}
            className={`flex-1 py-2 text-sm rounded-md transition-colors ${
              loginType === 'team' 
                ? 'bg-white text-teal-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Team Login
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 text-sm rounded-md transition-colors ${
              loginType === 'admin' 
                ? 'bg-white text-teal-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Team Login Form */}
        {loginType === 'team' && (
          <form onSubmit={handleTeamLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Team
              </label>
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Choose your team...</option>
                {Array.isArray(teams) && teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.members.join(', ')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your team password"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Hint: Team name + number of members (lowercase)
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 font-medium"
            >
              Login as Team
            </button>
          </form>
        )}

        {/* Admin Login Form */}
        {loginType === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cerise-600 text-white py-2 px-4 rounded-md hover:bg-cerise-700 font-medium"
            >
              Login as Admin
            </button>
          </form>
        )}

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have a team yet?{' '}
            <button
              onClick={onGoToRegistration}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Register new team
            </button>
          </p>
        </div>

        {(!Array.isArray(teams) || teams.length === 0) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-center">
              <p className="text-sm text-blue-800 mb-3">
                No teams registered yet. Admin can still login above, or register the first team:
              </p>
              <button
                onClick={onGoToRegistration}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
              >
                Register First Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginScreen