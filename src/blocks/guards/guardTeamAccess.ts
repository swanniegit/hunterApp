// LEGO BUILDER - Guard Block: Team Access Control
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes  
// SINGLE RESPONSIBILITY: Control access to team-specific data

import type { Team, Result } from '../../types'

export const guardTeamAccess = (
  requestingTeam: Team | null,
  targetTeamId: string,
  adminAuth?: { role: string }
): Result<boolean> => {
  // Admin can access any team data
  if (adminAuth?.role === 'admin') {
    return { success: true, data: true }
  }

  // Teams can only access their own data
  if (!requestingTeam) {
    return { success: false, error: 'Authentication required' }
  }

  if (requestingTeam.id !== targetTeamId) {
    return { success: false, error: 'Access denied: can only view own team data' }
  }

  return { success: true, data: true }
}