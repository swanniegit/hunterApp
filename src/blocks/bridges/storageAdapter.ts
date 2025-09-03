// LEGO BUILDER - Bridge Blocks: Hybrid Storage Adapter (API + localStorage fallback)
// Network-first storage with localStorage backup for offline use

import type { Team, PhysicalGroup, Result } from '../../types'
import { guardLocalStorageAccess } from '../guards/errorGuards'
import { 
  apiLoadAllTeams, 
  apiSaveTeam, 
  apiLoadTeam,
  apiUpdateTeamStation,
  apiResetTeam,
  apiTeamLogin,
  apiAdminLogin,
  apiLoadGroups,
  apiSaveGroups,
  apiHealthCheck
} from './apiClient'

// Storage keys as constants
const STORAGE_KEYS = {
  teams: 'it-scavenger-hunt-teams',
  groups: 'it-scavenger-hunt-groups',
  currentTeam: 'current-team-id',
  authenticatedTeam: 'authenticated-team-id',
  adminAuth: 'admin-auth'
} as const

// Check if API is available
let apiAvailable: boolean | null = null
async function checkApiAvailability(): Promise<boolean> {
  if (apiAvailable === null) {
    apiAvailable = await apiHealthCheck()
    console.log(apiAvailable ? '🌐 API connection established' : '📱 Using offline mode')
  }
  return apiAvailable
}

// Generic storage operations (localStorage fallback)
export const saveToStorage = <T>(key: string, data: T): Result<boolean> => {
  const storageGuard = guardLocalStorageAccess()
  if (!storageGuard.success) return storageGuard
  
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return { success: true, data: true }
  } catch (error) {
    return { success: false, error: `Failed to save ${key}` }
  }
}

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  const storageGuard = guardLocalStorageAccess()
  if (!storageGuard.success) return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    return defaultValue
  }
}

// Hybrid team operations (API-first with localStorage fallback)
export const saveTeam = async (team: Team): Promise<Result<boolean>> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const result = await apiSaveTeam(team)
    if (result.success) {
      // Also save to localStorage as backup
      saveTeamToLocalStorage(team)
      return { success: true, data: true }
    }
    console.warn('API save failed, falling back to localStorage:', result.error)
  }
  
  // Fallback to localStorage
  return saveTeamToLocalStorage(team)
}

const saveTeamToLocalStorage = (team: Team): Result<boolean> => {
  const teams = loadFromStorage(STORAGE_KEYS.teams, [])
  const existingIndex = teams.findIndex(t => t.id === team.id)
  
  const updatedTeam = { ...team, lastUpdated: new Date().toISOString() }
  
  if (existingIndex >= 0) {
    teams[existingIndex] = updatedTeam
  } else {
    teams.push(updatedTeam)
  }
  
  return saveToStorage(STORAGE_KEYS.teams, teams)
}

export const loadAllTeams = async (): Promise<Team[]> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const teams = await apiLoadAllTeams()
    if (teams.length > 0) {
      // Cache teams to localStorage
      saveToStorage(STORAGE_KEYS.teams, teams)
      return teams
    }
  }
  
  // Fallback to localStorage
  return loadFromStorage(STORAGE_KEYS.teams, [])
}

export const loadCurrentTeamId = (): string | null => {
  return loadFromStorage(STORAGE_KEYS.currentTeam, null)
}

export const saveCurrentTeamId = (teamId: string): Result<boolean> => {
  return saveToStorage(STORAGE_KEYS.currentTeam, teamId)
}

// Authentication operations
export const authenticateTeam = async (teamId: string, password: string): Promise<Result<Team>> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const result = await apiTeamLogin(teamId, password)
    if (result.success) {
      // Save authenticated team ID
      saveToStorage(STORAGE_KEYS.authenticatedTeam, teamId)
      return result
    }
    return result
  }
  
  // Fallback: check localStorage teams and validate password locally
  const teams = loadFromStorage(STORAGE_KEYS.teams, [])
  const team = teams.find(t => t.id === teamId)
  
  if (!team) {
    return { success: false, error: 'Team not found' }
  }
  
  const expectedPassword = (team.name + team.members.length).toLowerCase()
  if (password === expectedPassword) {
    saveToStorage(STORAGE_KEYS.authenticatedTeam, teamId)
    return { success: true, data: team }
  }
  
  return { success: false, error: 'Invalid password' }
}

export const authenticateAdmin = async (username: string, password: string): Promise<Result<any>> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const result = await apiAdminLogin(username, password)
    if (result.success) {
      saveToStorage(STORAGE_KEYS.adminAuth, result.data)
      return result
    }
    return result
  }
  
  // Fallback: hardcoded admin check
  if (username === 'admin' && password === 'hunt2024') {
    const adminData = { username, role: 'admin', loginTime: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.adminAuth, adminData)
    return { success: true, data: adminData }
  }
  
  return { success: false, error: 'Invalid admin credentials' }
}

// Groups operations
export const loadGroups = async (): Promise<PhysicalGroup[]> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const groups = await apiLoadGroups()
    if (groups.length > 0) {
      saveToStorage(STORAGE_KEYS.groups, groups)
      return groups
    }
  }
  
  return loadFromStorage(STORAGE_KEYS.groups, [])
}

export const saveGroups = async (groups: PhysicalGroup[]): Promise<Result<boolean>> => {
  const isApiAvailable = await checkApiAvailability()
  
  if (isApiAvailable) {
    const result = await apiSaveGroups(groups)
    if (result.success) {
      saveToStorage(STORAGE_KEYS.groups, groups)
      return { success: true, data: true }
    }
  }
  
  return saveToStorage(STORAGE_KEYS.groups, groups)
}