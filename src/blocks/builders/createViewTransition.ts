// LEGO BUILDER - Builder Block: View Transition Factory
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create view transition function map

export const createViewTransition = (currentView: string) => ({
  toRegistration: () => 'registration',
  toTeamSelection: () => 'team-selection', 
  toDashboard: () => 'dashboard',
  toStation: () => 'station',
  toCollaborativeStation: () => 'collaborative-station',
  toAdmin: () => 'admin',
  current: () => currentView
})