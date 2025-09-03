// LEGO BUILDER - Controller Block: Team Registration
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Team registration orchestration

import type { Team } from '../../types'
import { saveTeam, saveCurrentTeamId } from '../bridges/storageAdapter'

export const handleTeamRegistration = (
  team: Team,
  updateTeamsList: (teams: Team[]) => void,
  setCurrentTeam: (team: Team) => void
): void => {
  const saveResult = saveTeam(team)
  if (saveResult.success) {
    updateTeamsList(prevTeams => [...prevTeams, team])
    setCurrentTeam(team)
    saveCurrentTeamId(team.id)
  }
}