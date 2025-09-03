// LEGO BUILDER - Builder Block: Team Score Update
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Update team with new total score

import type { Team } from '../../types'

export const updateTeamWithScore = (existingTeam: Team, score: number): Team => ({
  ...existingTeam,
  totalScore: score,
  lastUpdated: new Date().toISOString()
})