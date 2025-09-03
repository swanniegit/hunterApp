// LEGO BUILDER - Composer Block: Stations with Status Composition
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Compose stations with team-specific status

import type { Team, Station } from '../../types'

export const composeStationsWithStatus = (team: Team | null, stations: Station[]) => {
  if (!team) return stations.map(s => ({ ...s, status: 'locked' }))
  
  // Safely handle potentially undefined arrays
  const completedStations = team.completedStations || []
  const unlockedStations = team.unlockedStations || []
  
  return stations.map(station => ({
    ...station,
    status: completedStations.includes(station.id) ? 'completed' :
           unlockedStations.includes(station.id) ? 'available' : 'locked'
  }))
}