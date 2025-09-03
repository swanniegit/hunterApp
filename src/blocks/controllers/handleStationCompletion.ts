// LEGO BUILDER - Controller Block: Station Completion
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Station completion orchestration

import type { Team, StationResult } from '../../types'
import { updateTeamBuilder } from '../builders/teamBuilder'
import { saveTeam } from '../bridges/storageAdapter'
import { guardTeamExists } from '../guards/errorGuards'

export const handleStationCompletion = (
  currentTeam: Team,
  stationResult: StationResult,
  updateTeam: (team: Team) => void,
  updateTeamsList: (updater: (teams: Team[]) => Team[]) => void
): void => {
  const guard = guardTeamExists(currentTeam)
  if (!guard.success) return
  
  const teamUpdater = updateTeamBuilder(currentTeam)
  const updatedTeam = teamUpdater.withStationComplete(
    stationResult.stationId,
    stationResult.answers,
    stationResult.score
  )
  
  updateTeam(updatedTeam)
  updateTeamsList(teams => teams.map(t => t.id === currentTeam.id ? updatedTeam : t))
  saveTeam(updatedTeam)
}