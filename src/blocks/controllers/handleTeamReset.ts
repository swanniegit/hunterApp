// LEGO BUILDER - Controller Block: Team Reset
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Team reset orchestration

import type { Team } from '../../types'
import { updateTeamBuilder } from '../builders/teamBuilder'
import { saveTeam } from '../bridges/storageAdapter'

export const handleTeamReset = (
  teamId: string,
  updateTeamsList: (updater: (teams: Team[]) => Team[]) => void,
  currentTeam: Team | null,
  updateCurrentTeam: (team: Team | null) => void
): void => {
  updateTeamsList(teams => teams.map(team => {
    if (team.id === teamId) {
      const teamUpdater = updateTeamBuilder(team)
      const resetTeam = teamUpdater.reset()
      saveTeam(resetTeam)
      return resetTeam
    }
    return team
  }))
  
  // Update current team if it matches
  if (currentTeam?.id === teamId) {
    const teamUpdater = updateTeamBuilder(currentTeam)
    updateCurrentTeam(teamUpdater.reset())
  }
}