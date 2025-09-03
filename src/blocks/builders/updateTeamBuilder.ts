// LEGO BUILDER - Builder Block: Team Update Factory
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create fluent team update interface

import type { Team } from '../../types'
import { updateTeamWithScore } from './updateTeamWithScore'
import { updateTeamWithStationComplete } from './updateTeamWithStationComplete'
import { updateTeamWithStationUnlock } from './updateTeamWithStationUnlock'
import { resetTeam } from './resetTeam'

export const updateTeamBuilder = (existingTeam: Team) => ({
  withScore: (score: number): Team => updateTeamWithScore(existingTeam, score),
  withStationComplete: (stationId: string, answers: Record<string, any>, score: number): Team => 
    updateTeamWithStationComplete(existingTeam, stationId, answers, score),
  withStationUnlock: (stationId: string): Team => updateTeamWithStationUnlock(existingTeam, stationId),
  reset: (): Team => resetTeam(existingTeam)
})