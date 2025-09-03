// LEGO BUILDER - Builder Block: App State Factory (SECURE)
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create initial application state structure with security

export const buildAppState = () => ({
  currentView: 'login',  // ALWAYS START WITH LOGIN (admin/teams both login here)
  teamData: null,
  currentStation: null,
  allTeams: [],
  physicalGroups: []
})