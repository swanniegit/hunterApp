// LEGO BUILDER - Builder Block: Team Creation
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Pure team factory function

import type { Team } from '../../types'
import { generateId } from '../utilities/generateId'

export const createTeam = (name: string, members: string[]): Team => {
  const now = new Date().toISOString()
  
  return {
    id: generateId(),
    name,
    members,
    unlockedStations: [],
    completedStations: [],
    currentStation: null,
    stationAnswers: {},
    totalScore: 0,
    startTime: now,
    createdAt: now,
    lastUpdated: now
  }
}