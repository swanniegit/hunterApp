// LEGO BUILDER - Controller Block: Back Navigation
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Back navigation orchestration

import type { Station } from '../../types'

export const handleBackNavigation = (
  fromView: string,
  teamCount: number,
  setCurrentView: (view: string) => void,
  setCurrentStation: (station: Station | null) => void
): void => {
  setCurrentStation(null)
  
  const backViews: Record<string, string> = {
    'station': 'dashboard',
    'collaborative-station': 'dashboard', 
    'admin': teamCount > 0 ? 'team-selection' : 'registration'
  }
  
  const backView = backViews[fromView] || 'dashboard'
  setCurrentView(backView)
}