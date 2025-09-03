// LEGO BUILDER - Builder Block: Team Reset
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Reset team to initial state

import type { Team } from '../../types'

export const resetTeam = (existingTeam: Team): Team => ({
  ...existingTeam,
  unlockedStations: [],
  completedStations: [],
  currentStation: null,
  stationAnswers: {},
  totalScore: 0,
  lastUpdated: new Date().toISOString()
})