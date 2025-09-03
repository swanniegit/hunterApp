// LEGO BUILDER - Guard Block: Initial View Security Guard
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Determine secure initial view on app load (ALWAYS LOGIN FIRST)

import type { Team } from '../../types'

export const guardInitialView = (
  allTeams: Team[],
  authenticatedTeam: Team | null,
  adminAuth: { role: string } | null
): string => {
  console.log('🔐 Initial View Guard:', { 
    teamsCount: allTeams.length, 
    hasAuthTeam: !!authenticatedTeam,
    hasAdmin: !!adminAuth 
  })

  // If authenticated, show appropriate view
  if (authenticatedTeam) {
    console.log('🔐 Authenticated team → dashboard')
    return 'dashboard'
  }

  if (adminAuth) {
    console.log('🔐 Authenticated admin → admin')
    return 'admin'
  }

  // ALWAYS show login first - admin and teams both need to login
  // Login screen will show "register team" option when no teams exist
  console.log('🔐 No valid auth → login (admin/teams can both login here)')
  return 'login'
}