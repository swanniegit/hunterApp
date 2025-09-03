// LEGO BUILDER - Controller Block: Admin Login Handler
// ASSIGNED CODER: Gemini | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Handle admin login process

import { guardAdminAuth } from '../guards/guardAdminAuth'
import { saveToStorage } from '../bridges/storageAdapter'

export const handleAdminLogin = (
  username: string,
  password: string,
  setAdminAuth: (auth: { role: string, username: string }) => void,
  setCurrentView: (view: string) => void
): void => {
  const authResult = guardAdminAuth(username, password)
  
  if (!authResult.success) {
    alert(authResult.error)
    return
  }

  // Store admin authentication session  
  saveToStorage('admin-auth', authResult.data)
  saveToStorage('auth-timestamp', Date.now())
  
  setAdminAuth(authResult.data)
  setCurrentView('admin')
}