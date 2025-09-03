// LEGO BUILDER - Guard Blocks: Error Handling & Validation
// ASSIGNED CODER: Claude
// CATEGORY: Guard Block
// REWRITE TIME: 2 minutes  
// COMPLEXITY: Simple (10-15 lines max)

import type { Team, Station } from '../../types'

// Result type for error handling
export type Result<T, E = string> = {
  success: true
  data: T
} | {
  success: false  
  error: E
}

// Team existence guard
export const guardTeamExists = (team: Team | null): Result<Team> => {
  if (!team) {
    return { success: false, error: 'Team not found' }
  }
  return { success: true, data: team }
}

// Station access guard
export const guardStationAccess = (team: Team, stationId: string): Result<boolean> => {
  if (!team.unlockedStations.includes(stationId)) {
    return { success: false, error: 'Station not unlocked for this team' }
  }
  return { success: true, data: true }
}

// Station completion guard  
export const guardStationNotCompleted = (team: Team, stationId: string): Result<boolean> => {
  if (team.completedStations.includes(stationId)) {
    return { success: false, error: 'Station already completed' }
  }
  return { success: true, data: true }
}

// Data persistence guard
export const guardLocalStorageAccess = (): Result<Storage> => {
  try {
    if (typeof localStorage !== 'undefined') {
      // Test localStorage access
      localStorage.setItem('test', 'test')
      localStorage.removeItem('test')
      return { success: true, data: localStorage }
    }
    return { success: false, error: 'localStorage not available' }
  } catch (error) {
    return { success: false, error: 'localStorage access denied' }
  }
}

// Array bounds guard
export const guardArrayIndex = <T>(array: T[], index: number): Result<T> => {
  if (index < 0 || index >= array.length) {
    return { success: false, error: 'Index out of bounds' }
  }
  return { success: true, data: array[index] }
}