// LEGO BUILDER - Guard Block: Admin Authentication  
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Verify admin login credentials

import type { Result } from '../../types'

export const guardAdminAuth = (
  username: string, 
  password: string
): Result<{ role: 'admin', username: string }> => {
  if (!username || !password) {
    return { success: false, error: 'Username and password required' }
  }

  // Simple admin credentials (in production, use proper auth)
  const validCredentials = [
    { username: 'admin', password: 'hunter2023' },
    { username: 'organizer', password: 'event2023' }
  ]

  const validAdmin = validCredentials.find(
    cred => cred.username.toLowerCase() === username.toLowerCase() && 
            cred.password === password
  )

  if (!validAdmin) {
    return { success: false, error: 'Invalid admin credentials' }
  }

  return { 
    success: true, 
    data: { role: 'admin', username: validAdmin.username }
  }
}