// LEGO BUILDER - Guard Block: Team Authentication
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Verify team login credentials

import type { Team, Result } from '../../types'

export const guardTeamAuth = (
  teamId: string, 
  password: string, 
  teams: Team[]
): Result<Team> => {
  if (!teamId || !password) {
    return { success: false, error: 'Team ID and password required' }
  }

  const team = teams.find(t => t.id === teamId)
  if (!team) {
    return { success: false, error: 'Team not found' }
  }

  // Simple password check (team name + member count)
  const expectedPassword = `${team.name.toLowerCase()}${team.members.length}`
  if (password.toLowerCase() !== expectedPassword) {
    return { success: false, error: 'Invalid credentials' }
  }

  return { success: true, data: team }
}