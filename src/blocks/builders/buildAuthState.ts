// LEGO BUILDER - Builder Block: Authentication State Factory
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create initial authentication state

export const buildAuthState = () => ({
  authenticatedTeam: null,
  adminAuth: null,
  isAuthenticated: false,
  sessionExpiry: null
})