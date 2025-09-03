// LEGO BUILDER - Guard Block: Progress Viewing Access
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Control who can view team progress

import type { Team, Result } from '../../types'

export const guardProgressView = (
  currentTeam: Team | null,
  targetTeams: Team[],
  adminAuth?: { role: string }
): Result<Team[]> => {
  // Admin can see all team progress
  if (adminAuth?.role === 'admin') {
    return { success: true, data: targetTeams }
  }

  // Authenticated teams can only see their own progress
  if (!currentTeam) {
    return { success: false, error: 'Login required to view progress' }
  }

  // Return only the current team's data
  const ownTeamData = targetTeams.filter(team => team.id === currentTeam.id)
  return { success: true, data: ownTeamData }
}