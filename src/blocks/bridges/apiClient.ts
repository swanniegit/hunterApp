// API Client for backend communication
import type { Team, PhysicalGroup, Result } from '../../types'

const API_BASE_URL = 'http://localhost:3002/api'

// Generic API request helper
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<Result<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { 
        success: false, 
        error: errorData.error || `HTTP ${response.status}: ${response.statusText}` 
      }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network request failed' 
    }
  }
}

// Team API operations
export const apiLoadAllTeams = async (): Promise<Team[]> => {
  const result = await apiRequest<Team[]>('/teams')
  return result.success ? result.data : []
}

export const apiSaveTeam = async (team: Team): Promise<Result<Team>> => {
  if (team.id && team.id !== 'new') {
    // Update existing team
    return await apiRequest<Team>(`/teams/${team.id}`, {
      method: 'PUT',
      body: JSON.stringify(team),
    })
  } else {
    // Create new team
    return await apiRequest<Team>('/teams', {
      method: 'POST',
      body: JSON.stringify(team),
    })
  }
}

export const apiLoadTeam = async (teamId: string): Promise<Team | null> => {
  const result = await apiRequest<Team>(`/teams/${teamId}`)
  return result.success ? result.data : null
}

export const apiUpdateTeamStation = async (
  teamId: string, 
  stationId: string, 
  action: 'unlock' | 'complete' | 'reset',
  payload?: { score?: number; answers?: any }
): Promise<Result<Team>> => {
  return await apiRequest<Team>(`/teams/${teamId}/stations/${stationId}/${action}`, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export const apiResetTeam = async (teamId: string): Promise<Result<Team>> => {
  return await apiRequest<Team>(`/teams/${teamId}/reset`, {
    method: 'POST',
  })
}

// Authentication API operations
export const apiTeamLogin = async (teamId: string, password: string): Promise<Result<Team>> => {
  return await apiRequest<{ success: boolean; team: Team }>('/teams/login', {
    method: 'POST',
    body: JSON.stringify({ teamId, password }),
  }).then(result => {
    if (result.success && result.data.success) {
      return { success: true, data: result.data.team }
    }
    return { success: false, error: result.success ? 'Invalid credentials' : result.error }
  })
}

export const apiAdminLogin = async (username: string, password: string): Promise<Result<any>> => {
  return await apiRequest<{ success: boolean; admin: any }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }).then(result => {
    if (result.success && result.data.success) {
      return { success: true, data: result.data.admin }
    }
    return { success: false, error: result.success ? 'Invalid credentials' : result.error }
  })
}

// Groups API operations
export const apiLoadGroups = async (): Promise<PhysicalGroup[]> => {
  const result = await apiRequest<PhysicalGroup[]>('/groups')
  return result.success ? result.data : []
}

export const apiSaveGroups = async (groups: PhysicalGroup[]): Promise<Result<PhysicalGroup[]>> => {
  return await apiRequest<PhysicalGroup[]>('/groups', {
    method: 'PUT',
    body: JSON.stringify(groups),
  })
}

// Health check
export const apiHealthCheck = async (): Promise<boolean> => {
  const result = await apiRequest<{ status: string }>('/health')
  return result.success && result.data.status === 'OK'
}