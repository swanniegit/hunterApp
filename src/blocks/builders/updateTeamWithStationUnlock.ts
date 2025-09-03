// LEGO BUILDER - Builder Block: Station Unlock Update  
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Update team when station is unlocked

import type { Team } from '../../types'

export const updateTeamWithStationUnlock = (existingTeam: Team, stationId: string): Team => ({
  ...existingTeam,
  unlockedStations: [...existingTeam.unlockedStations, stationId],
  lastUpdated: new Date().toISOString()
})