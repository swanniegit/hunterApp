// LEGO BUILDER - Builder Block: Station State Factory
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Create initial station state structure

export const buildStationState = () => ({
  currentPuzzle: 0,
  answers: {},
  timeRemaining: 300,
  hintsUsed: 0,
  showHint: false
})