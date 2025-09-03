// LEGO BUILDER - Controller Block: Team Selection
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Team selection orchestration

import type { Team } from '../../types'
import { saveCurrentTeamId } from '../bridges/storageAdapter'
import { guardTeamExists } from '../guards/errorGuards'

export const handleTeamSelection = (
  team: Team,
  setCurrentTeam: (team: Team) => void
): void => {
  const guard = guardTeamExists(team)
  if (guard.success) {
    setCurrentTeam(team)
    saveCurrentTeamId(team.id)
  }
}