// LEGO BUILDER - Controller Block: Team Login Handler
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Handle team login process

import type { Team } from '../../types'
import { guardTeamAuth } from '../guards/guardTeamAuth'
import { saveToStorage } from '../bridges/storageAdapter'

export const handleTeamLogin = (
  teamId: string,
  password: string,
  teams: Team[],
  setAuthenticatedTeam: (team: Team) => void,
  setCurrentView: (view: string) => void
): void => {
  const authResult = guardTeamAuth(teamId, password, teams)
  
  if (!authResult.success) {
    alert(authResult.error)
    return
  }

  // Store authentication session
  saveToStorage('authenticated-team-id', authResult.data.id)
  saveToStorage('auth-timestamp', Date.now())
  
  setAuthenticatedTeam(authResult.data)
  setCurrentView('dashboard')
}