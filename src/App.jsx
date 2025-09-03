import { useState, useEffect } from 'react'
import TeamRegistration from './components/TeamRegistration'
import TeamSelection from './components/TeamSelection'
import Dashboard from './components/Dashboard'
import Station from './components/Station'
import CollaborativeStation from './components/CollaborativeStation'
import AdminController from './components/AdminController'
import dataManager from './utils/dataManager'
import { getAllStations } from './data/stationContent'

function App() {
  const [currentView, setCurrentView] = useState('team-selection')
  const [teamData, setTeamData] = useState(null)
  const [currentStation, setCurrentStation] = useState(null)
  const [allTeams, setAllTeams] = useState([])
  const [physicalGroups, setPhysicalGroups] = useState([])

  const stations = getAllStations()

  // Load data on app start
  useEffect(() => {
    const teams = dataManager.getAllTeams()
    const groups = dataManager.getAllGroups()
    
    setAllTeams(teams)
    setPhysicalGroups(groups)
    
    // Check if there's a saved current team
    const savedTeamId = localStorage.getItem('current-team-id')
    if (savedTeamId && teams.length > 0) {
      const savedTeam = teams.find(t => t.id === savedTeamId)
      if (savedTeam) {
        setTeamData(savedTeam)
        setCurrentView('dashboard')
      } else if (teams.length > 0) {
        setCurrentView('team-selection')
      } else {
        setCurrentView('registration')
      }
    } else if (teams.length > 0) {
      setCurrentView('team-selection')
    } else {
      setCurrentView('registration')
    }
  }, [])

  // Auto-save data when teams or groups change
  useEffect(() => {
    if (allTeams.length > 0) {
      // Save all teams
      allTeams.forEach(team => dataManager.saveTeam(team))
    }
  }, [allTeams])

  useEffect(() => {
    if (physicalGroups.length > 0) {
      dataManager.saveGroups(physicalGroups)
    }
  }, [physicalGroups])

  const handleTeamRegistered = (team) => {
    // Add team to global teams list
    const enhancedTeam = {
      ...team,
      unlockedStations: [], // Will be managed by admin
      completedStations: [],
      currentStation: null,
      stationAnswers: {},
      totalScore: 0,
      startTime: new Date().toISOString()
    }
    
    setAllTeams(prev => [...prev, enhancedTeam])
    setTeamData(enhancedTeam)
    localStorage.setItem('current-team-id', enhancedTeam.id)
    setCurrentView('dashboard')
  }

  const handleTeamSelected = (team) => {
    // Update team data with latest from storage
    const latestTeam = allTeams.find(t => t.id === team.id) || team
    setTeamData(latestTeam)
    localStorage.setItem('current-team-id', latestTeam.id)
    setCurrentView('dashboard')
  }

  const handleStationSelect = (stationId) => {
    // Check if team has this station unlocked
    const isUnlocked = teamData.unlockedStations?.includes(stationId)
    if (isUnlocked) {
      const station = stations.find(s => s.id === stationId)
      setCurrentStation(station)
      
      // Check if team is part of a physical group
      const teamGroup = physicalGroups.find(group => 
        group.teams.some(team => team.id === teamData.id)
      )
      
      if (teamGroup) {
        setCurrentView('collaborative-station')
      } else {
        setCurrentView('station')
      }
      
      // Update team's current station
      updateTeamData({ currentStation: stationId })
    }
  }

  const handleStationComplete = (stationResult) => {
    // Update team data with station completion
    const updatedTeam = {
      ...teamData,
      completedStations: [...(teamData.completedStations || []), stationResult.stationId],
      totalScore: (teamData.totalScore || 0) + stationResult.score,
      currentStation: null,
      stationAnswers: {
        ...teamData.stationAnswers,
        [stationResult.stationId]: stationResult.answers || {}
      }
    }
    
    // Update in global teams list
    setAllTeams(prev => 
      prev.map(team => team.id === teamData.id ? updatedTeam : team)
    )
    
    setTeamData(updatedTeam)
    setCurrentStation(null)
    setCurrentView('dashboard')
  }

  const updateTeamData = (updates) => {
    const updatedTeam = { ...teamData, ...updates }
    setTeamData(updatedTeam)
    
    // Update in global teams list
    setAllTeams(prev => 
      prev.map(team => team.id === teamData.id ? updatedTeam : team)
    )
  }

  const handleUpdateTeamStations = (teamId, stationId, action) => {
    setAllTeams(prev => 
      prev.map(team => {
        if (team.id === teamId) {
          if (action === 'unlock') {
            return {
              ...team,
              unlockedStations: [...(team.unlockedStations || []), stationId]
            }
          } else if (action === 'lock') {
            return {
              ...team,
              unlockedStations: (team.unlockedStations || []).filter(id => id !== stationId)
            }
          }
        }
        return team
      })
    )
    
    // Update current team data if it matches
    if (teamData?.id === teamId) {
      if (action === 'unlock') {
        setTeamData(prev => ({
          ...prev,
          unlockedStations: [...(prev.unlockedStations || []), stationId]
        }))
      } else if (action === 'lock') {
        setTeamData(prev => ({
          ...prev,
          unlockedStations: (prev.unlockedStations || []).filter(id => id !== stationId)
        }))
      }
    }
  }

  const handleResetTeam = (teamId) => {
    setAllTeams(prev => 
      prev.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            unlockedStations: [],
            completedStations: [],
            currentStation: null,
            stationAnswers: {},
            totalScore: 0
          }
        }
        return team
      })
    )
    
    // Reset current team data if it matches
    if (teamData?.id === teamId) {
      setTeamData(prev => ({
        ...prev,
        unlockedStations: [],
        completedStations: [],
        currentStation: null,
        stationAnswers: {},
        totalScore: 0
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Access Button */}
      {currentView !== 'admin' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setCurrentView('admin')}
            className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-900"
          >
            Admin Controller
          </button>
        </div>
      )}

      {currentView === 'registration' && (
        <TeamRegistration onTeamRegistered={handleTeamRegistered} />
      )}
      
      {currentView === 'team-selection' && (
        <TeamSelection 
          teams={allTeams}
          onTeamSelected={handleTeamSelected}
          onBackToRegistration={() => setCurrentView('registration')}
        />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard 
          team={teamData}
          stations={stations.map(station => ({
            ...station,
            status: teamData.completedStations?.includes(station.id) ? 'completed' :
                   teamData.unlockedStations?.includes(station.id) ? 'available' : 'locked'
          }))}
          onStationSelect={handleStationSelect}
        />
      )}
      
      {currentView === 'station' && (
        <Station 
          station={currentStation}
          team={teamData}
          onComplete={handleStationComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'collaborative-station' && (
        <CollaborativeStation 
          station={currentStation}
          team={teamData}
          physicalGroup={physicalGroups.find(group => 
            group.teams.some(team => team.id === teamData.id)
          )}
          onComplete={handleStationComplete}
          onBack={() => setCurrentView('dashboard')}
          onUnlockForGroup={(groupId, stationId, phase) => {
            // Handle group unlocking logic
            console.log('Unlocking', phase, 'for group', groupId, 'at station', stationId)
          }}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminController 
          teams={allTeams}
          stations={stations}
          groups={physicalGroups}
          onUpdateTeamStations={handleUpdateTeamStations}
          onResetTeam={handleResetTeam}
          onUpdateGroups={setPhysicalGroups}
          onBack={() => setCurrentView(allTeams.length > 0 ? 'team-selection' : 'registration')}
        />
      )}
    </div>
  )
}

export default App
