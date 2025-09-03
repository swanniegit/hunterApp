// Data Management System for IT Scavenger Hunt
// Handles persistence, sync, and data operations

class DataManager {
  constructor() {
    this.eventKey = 'it-scavenger-hunt-event'
    this.teamsKey = 'it-scavenger-hunt-teams'
    this.groupsKey = 'it-scavenger-hunt-groups'
    this.adminKey = 'it-scavenger-hunt-admin'
  }

  // ==================== TEAMS ====================
  
  saveTeam(team) {
    try {
      const teams = this.getAllTeams()
      const existingIndex = teams.findIndex(t => t.id === team.id)
      
      if (existingIndex >= 0) {
        teams[existingIndex] = { ...team, lastUpdated: new Date().toISOString() }
      } else {
        teams.push({ ...team, createdAt: new Date().toISOString(), lastUpdated: new Date().toISOString() })
      }
      
      localStorage.setItem(this.teamsKey, JSON.stringify(teams))
      return true
    } catch (error) {
      console.error('Error saving team:', error)
      return false
    }
  }

  getAllTeams() {
    try {
      const teams = localStorage.getItem(this.teamsKey)
      return teams ? JSON.parse(teams) : []
    } catch (error) {
      console.error('Error loading teams:', error)
      return []
    }
  }

  getTeamById(teamId) {
    const teams = this.getAllTeams()
    return teams.find(team => team.id === teamId) || null
  }

  updateTeamProgress(teamId, stationId, progressData) {
    try {
      const teams = this.getAllTeams()
      const teamIndex = teams.findIndex(t => t.id === teamId)
      
      if (teamIndex >= 0) {
        const team = teams[teamIndex]
        
        // Update station progress
        if (!team.stationProgress) team.stationProgress = {}
        team.stationProgress[stationId] = {
          ...progressData,
          completedAt: new Date().toISOString()
        }
        
        // Update completed stations
        if (!team.completedStations) team.completedStations = []
        if (!team.completedStations.includes(stationId)) {
          team.completedStations.push(stationId)
        }
        
        // Update total score
        team.totalScore = (team.totalScore || 0) + (progressData.score || 0)
        team.lastUpdated = new Date().toISOString()
        
        this.saveTeam(team)
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating team progress:', error)
      return false
    }
  }

  resetTeam(teamId) {
    try {
      const teams = this.getAllTeams()
      const teamIndex = teams.findIndex(t => t.id === teamId)
      
      if (teamIndex >= 0) {
        teams[teamIndex] = {
          ...teams[teamIndex],
          unlockedStations: [],
          completedStations: [],
          currentStation: null,
          stationAnswers: {},
          stationProgress: {},
          totalScore: 0,
          lastUpdated: new Date().toISOString()
        }
        
        localStorage.setItem(this.teamsKey, JSON.stringify(teams))
        return true
      }
      return false
    } catch (error) {
      console.error('Error resetting team:', error)
      return false
    }
  }

  deleteTeam(teamId) {
    try {
      const teams = this.getAllTeams().filter(t => t.id !== teamId)
      localStorage.setItem(this.teamsKey, JSON.stringify(teams))
      return true
    } catch (error) {
      console.error('Error deleting team:', error)
      return false
    }
  }

  // ==================== GROUPS ====================
  
  saveGroups(groups) {
    try {
      const groupsWithTimestamp = groups.map(group => ({
        ...group,
        lastUpdated: new Date().toISOString()
      }))
      localStorage.setItem(this.groupsKey, JSON.stringify(groupsWithTimestamp))
      return true
    } catch (error) {
      console.error('Error saving groups:', error)
      return false
    }
  }

  getAllGroups() {
    try {
      const groups = localStorage.getItem(this.groupsKey)
      return groups ? JSON.parse(groups) : []
    } catch (error) {
      console.error('Error loading groups:', error)
      return []
    }
  }

  getGroupById(groupId) {
    const groups = this.getAllGroups()
    return groups.find(group => group.id === groupId) || null
  }

  updateGroupProgress(groupId, stationId, phase, progressData) {
    try {
      const groups = this.getAllGroups()
      const groupIndex = groups.findIndex(g => g.id === groupId)
      
      if (groupIndex >= 0) {
        const group = groups[groupIndex]
        
        if (!group.stationProgress) group.stationProgress = {}
        if (!group.stationProgress[stationId]) group.stationProgress[stationId] = {}
        
        group.stationProgress[stationId][phase] = {
          ...progressData,
          completedAt: new Date().toISOString()
        }
        
        group.lastUpdated = new Date().toISOString()
        this.saveGroups(groups)
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating group progress:', error)
      return false
    }
  }

  // ==================== EVENT CONFIGURATION ====================
  
  saveEventConfig(config) {
    try {
      const eventConfig = {
        ...config,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(this.eventKey, JSON.stringify(eventConfig))
      return true
    } catch (error) {
      console.error('Error saving event config:', error)
      return false
    }
  }

  getEventConfig() {
    try {
      const config = localStorage.getItem(this.eventKey)
      return config ? JSON.parse(config) : this.getDefaultEventConfig()
    } catch (error) {
      console.error('Error loading event config:', error)
      return this.getDefaultEventConfig()
    }
  }

  getDefaultEventConfig() {
    return {
      eventName: 'IT Career Day Scavenger Hunt',
      maxTeamSize: 5,
      minTeamSize: 2,
      stationTimeLimit: 15, // minutes
      eventStatus: 'setup', // 'setup', 'active', 'paused', 'completed'
      startTime: null,
      endTime: null,
      settings: {
        allowTeamReset: true,
        allowLateRegistration: true,
        showLeaderboard: true,
        requireAllStations: false
      }
    }
  }

  // ==================== ADMIN SETTINGS ====================
  
  saveAdminSettings(settings) {
    try {
      const adminSettings = {
        ...settings,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(this.adminKey, JSON.stringify(adminSettings))
      return true
    } catch (error) {
      console.error('Error saving admin settings:', error)
      return false
    }
  }

  getAdminSettings() {
    try {
      const settings = localStorage.getItem(this.adminKey)
      return settings ? JSON.parse(settings) : this.getDefaultAdminSettings()
    } catch (error) {
      console.error('Error loading admin settings:', error)
      return this.getDefaultAdminSettings()
    }
  }

  getDefaultAdminSettings() {
    return {
      autoSave: true,
      refreshInterval: 5000,
      notifications: true,
      backupFrequency: 30, // minutes
      exportFormat: 'json'
    }
  }

  // ==================== DATA EXPORT/IMPORT ====================
  
  exportAllData() {
    try {
      return {
        teams: this.getAllTeams(),
        groups: this.getAllGroups(),
        eventConfig: this.getEventConfig(),
        adminSettings: this.getAdminSettings(),
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }
    } catch (error) {
      console.error('Error exporting data:', error)
      return null
    }
  }

  importData(data) {
    try {
      if (data.teams) {
        localStorage.setItem(this.teamsKey, JSON.stringify(data.teams))
      }
      if (data.groups) {
        localStorage.setItem(this.groupsKey, JSON.stringify(data.groups))
      }
      if (data.eventConfig) {
        localStorage.setItem(this.eventKey, JSON.stringify(data.eventConfig))
      }
      if (data.adminSettings) {
        localStorage.setItem(this.adminKey, JSON.stringify(data.adminSettings))
      }
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  // ==================== UTILITIES ====================
  
  clearAllData() {
    try {
      localStorage.removeItem(this.teamsKey)
      localStorage.removeItem(this.groupsKey)
      localStorage.removeItem(this.eventKey)
      localStorage.removeItem(this.adminKey)
      return true
    } catch (error) {
      console.error('Error clearing data:', error)
      return false
    }
  }

  getDataSize() {
    try {
      const teams = localStorage.getItem(this.teamsKey) || ''
      const groups = localStorage.getItem(this.groupsKey) || ''
      const config = localStorage.getItem(this.eventKey) || ''
      const admin = localStorage.getItem(this.adminKey) || ''
      
      const totalSize = teams.length + groups.length + config.length + admin.length
      return {
        totalBytes: totalSize,
        totalKB: Math.round(totalSize / 1024 * 100) / 100,
        breakdown: {
          teams: teams.length,
          groups: groups.length,
          config: config.length,
          admin: admin.length
        }
      }
    } catch (error) {
      console.error('Error calculating data size:', error)
      return { totalBytes: 0, totalKB: 0 }
    }
  }

  // ==================== ANALYTICS ====================
  
  getEventAnalytics() {
    try {
      const teams = this.getAllTeams()
      const groups = this.getAllGroups()
      
      const analytics = {
        overview: {
          totalTeams: teams.length,
          totalGroups: groups.length,
          totalParticipants: teams.reduce((sum, team) => sum + team.members.length, 0),
          averageTeamSize: teams.length ? teams.reduce((sum, team) => sum + team.members.length, 0) / teams.length : 0
        },
        progress: {
          teamsStarted: teams.filter(t => t.completedStations?.length > 0).length,
          teamsCompleted: teams.filter(t => t.completedStations?.length === 8).length,
          averageProgress: teams.length ? teams.reduce((sum, t) => sum + (t.completedStations?.length || 0), 0) / teams.length : 0
        },
        scores: {
          highestScore: Math.max(...teams.map(t => t.totalScore || 0), 0),
          averageScore: teams.length ? teams.reduce((sum, t) => sum + (t.totalScore || 0), 0) / teams.length : 0,
          totalPointsAwarded: teams.reduce((sum, t) => sum + (t.totalScore || 0), 0)
        },
        timing: {
          eventDuration: this.calculateEventDuration(),
          averageStationTime: this.calculateAverageStationTime(teams)
        }
      }
      
      return analytics
    } catch (error) {
      console.error('Error generating analytics:', error)
      return null
    }
  }

  calculateEventDuration() {
    const config = this.getEventConfig()
    if (config.startTime && config.endTime) {
      return new Date(config.endTime) - new Date(config.startTime)
    }
    return null
  }

  calculateAverageStationTime(teams) {
    // This would require tracking station start/end times
    // For now, return estimated based on completed stations
    const completedStations = teams.reduce((sum, team) => sum + (team.completedStations?.length || 0), 0)
    return completedStations > 0 ? (completedStations * 15) / completedStations : 0 // 15 min average
  }
}

// Create singleton instance
const dataManager = new DataManager()
export default dataManager

// Named exports for convenience
export const {
  saveTeam,
  getAllTeams,
  getTeamById,
  updateTeamProgress,
  resetTeam,
  saveGroups,
  getAllGroups,
  getGroupById,
  exportAllData,
  importData,
  getEventAnalytics
} = dataManager