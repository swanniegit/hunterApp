// LEGO BUILDER - Builder Block: Generic State Block Factory
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create generic state block with update function

import type { StateUpdate, StateBlock } from '../../types'

export const createStateBlock = <T>(initialState: T): StateBlock<T> => ({
  state: initialState,
  update: (update: StateUpdate<T>): T => ({
    ...initialState,
    ...update.payload
  })
})