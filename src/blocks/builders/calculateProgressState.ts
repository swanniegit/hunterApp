// LEGO BUILDER - Builder Block: Progress State Calculator
// ASSIGNED CODER: Cursor AI | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Calculate progress state from completion data

export const calculateProgressState = (completed: string[], total: number) => ({
  completedCount: completed.length,
  totalCount: total,
  progressPercentage: total > 0 ? Math.round((completed.length / total) * 100) : 0,
  isComplete: completed.length === total
})