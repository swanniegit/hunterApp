// LEGO BUILDER - Composer Block: Initial View Composition (SECURE)
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Determine initial view with authentication required

import type { Team } from '../../types'

export const composeInitialView = (teams: Team[], currentTeam: Team | null): string => {
  if (currentTeam) return 'dashboard'
  if (teams.length > 0) return 'login'  // FORCE LOGIN
  return 'registration'
}