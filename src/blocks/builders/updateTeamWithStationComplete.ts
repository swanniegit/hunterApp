// LEGO BUILDER - Builder Block: Station Completion Update
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Update team when station is completed

import type { Team } from '../../types'

export const updateTeamWithStationComplete = (
  existingTeam: Team, 
  stationId: string, 
  answers: Record<string, any>, 
  score: number
): Team => ({
  ...existingTeam,
  completedStations: [...existingTeam.completedStations, stationId],
  stationAnswers: { ...existingTeam.stationAnswers, [stationId]: answers },
  totalScore: existingTeam.totalScore + score,
  currentStation: null,
  lastUpdated: new Date().toISOString()
})