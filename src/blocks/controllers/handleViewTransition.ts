// LEGO BUILDER - Controller Block: View Transition
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: View transition orchestration

import { createViewTransition } from '../builders/stateBuilder'

export const handleViewTransition = (
  targetView: string,
  currentView: string,
  setCurrentView: (view: string) => void
): void => {
  const transition = createViewTransition(currentView)
  
  const validTransitions: Record<string, () => string> = {
    'registration': transition.toRegistration,
    'team-selection': transition.toTeamSelection,
    'dashboard': transition.toDashboard,
    'station': transition.toStation,
    'collaborative-station': transition.toCollaborativeStation,
    'admin': transition.toAdmin
  }
  
  if (validTransitions[targetView]) {
    setCurrentView(validTransitions[targetView]())
  }
}