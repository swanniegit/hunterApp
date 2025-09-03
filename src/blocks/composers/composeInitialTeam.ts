// LEGO BUILDER - Composer Block: Initial Team Composition
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Compose initial team from saved state

import type { Team } from '../../types'
import { loadFromStorage } from '../bridges/storageAdapter'

export const composeInitialTeam = (teams: Team[]): Team | null => {
  const savedTeamId = loadFromStorage('current-team-id', null)
  if (!savedTeamId || teams.length === 0) return null
  
  return teams.find(t => t.id === savedTeamId) || null
}