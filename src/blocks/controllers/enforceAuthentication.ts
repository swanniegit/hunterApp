// LEGO BUILDER - Controller Block: Authentication Enforcement
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Force clean authentication state on app start

import { saveToStorage, loadFromStorage } from '../bridges/storageAdapter'

export const enforceAuthentication = (): void => {
  // Clear any old session data that might bypass login
  const currentTeamId = loadFromStorage('current-team-id', null)
  const authTeamId = loadFromStorage('authenticated-team-id', null)
  const adminAuth = loadFromStorage('admin-auth', null)
  
  console.log('🔐 Auth Enforcement Check:', { currentTeamId, authTeamId, adminAuth })
  
  if (currentTeamId) {
    console.log('🔐 Clearing old currentTeamId')
    saveToStorage('current-team-id', null)
  }
  
  // Log current authentication state
  console.log('🔐 Authentication enforcement: Login screen will be shown unless valid session exists')
}