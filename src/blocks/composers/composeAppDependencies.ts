// LEGO BUILDER - Composer Block: App Dependencies Injection
// ASSIGNED CODER: Claude-4 | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create dependency injection container

import type { Station } from '../../types'
import { getAllStations } from '../../data/stationContent'
import * as storageAdapter from '../bridges/storageAdapter'
import * as teamController from '../controllers/teamController'
import * as navController from '../controllers/navigationController'

export interface AppDependencies {
  stations: Station[]
  storageAdapter: typeof storageAdapter
  teamController: typeof teamController
  navController: typeof navController
}

export const composeAppDependencies = (): AppDependencies => ({
  stations: getAllStations(),
  storageAdapter,
  teamController,
  navController
})