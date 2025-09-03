// LEGO BUILDER - Controller Block: Station Navigation
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Station navigation orchestration

import type { Team, Station, PhysicalGroup } from '../../types'
import { guardStationAccess, guardTeamExists } from '../guards/errorGuards'

export const handleStationNavigation = (
  team: Team,
  stationId: string,
  stations: Station[],
  physicalGroups: PhysicalGroup[],
  setCurrentStation: (station: Station) => void,
  setCurrentView: (view: string) => void
): void => {
  const teamGuard = guardTeamExists(team)
  if (!teamGuard.success) return
  
  const accessGuard = guardStationAccess(team, stationId)
  if (!accessGuard.success) return
  
  const station = stations.find(s => s.id === stationId)
  if (!station) return
  
  setCurrentStation(station)
  
  // Check if team is in a physical group
  const teamGroup = physicalGroups.find(group => 
    group.teams.some(groupTeam => groupTeam.id === team.id)
  )
  
  const view = teamGroup ? 'collaborative-station' : 'station'
  setCurrentView(view)
}