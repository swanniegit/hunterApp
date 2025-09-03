// LEGO BUILDER - Composer Block: Main App Composition
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Compose entire app from atomic blocks

import { composeAppState } from './composeAppState'
import { composeAppDependencies } from './composeAppDependencies'
import { composeInitialTeam } from './composeInitialTeam'
import { composeInitialView } from './composeInitialView'
import { composeStationsWithStatus } from './composeStationsWithStatus'

export const composeApp = () => {
  const dependencies = composeAppDependencies()
  
  return {
    initialState: composeAppState(),
    dependencies,
    composers: {
      composeInitialTeam,
      composeInitialView,
      composeStationsWithStatus
    }
  }
}