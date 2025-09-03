// LEGO BUILDER - Builder Block: Team with Defaults
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Enhanced team creation with default values

import type { Team } from '../../types'
import { createTeam } from './createTeam'

export const buildTeamWithDefaults = (name: string, members: string[]): Team => {
  const baseTeam = createTeam(name, members)
  
  return {
    ...baseTeam,
    // Could add default unlocked stations here based on config
    unlockedStations: [], // Admin will manage unlocks
  }
}