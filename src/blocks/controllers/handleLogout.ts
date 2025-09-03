// LEGO BUILDER - Controller Block: Logout Handler
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes  
// SINGLE RESPONSIBILITY: Handle logout process for all user types

import { saveToStorage } from '../bridges/storageAdapter'

export const handleLogout = (
  setAuthenticatedTeam: (team: null) => void,
  setAdminAuth: (auth: null) => void,
  setCurrentView: (view: string) => void
): void => {
  // Clear all authentication data
  saveToStorage('authenticated-team-id', null)
  saveToStorage('admin-auth', null)
  saveToStorage('auth-timestamp', null)
  
  // Reset app state
  setAuthenticatedTeam(null)
  setAdminAuth(null)
  setCurrentView('login')
}