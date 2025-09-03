// LEGO BUILDER - Composer Block: App State Composition
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Compose initial app state with data

import { buildAppState } from '../builders/buildAppState'
import { loadAllTeams, loadFromStorage } from '../bridges/storageAdapter'

export const composeAppState = () => {
  const initialState = buildAppState()
  const teams = loadAllTeams()
  const groups = loadFromStorage('it-scavenger-hunt-groups', [])
  
  return {
    ...initialState,
    allTeams: teams,
    physicalGroups: groups
  }
}