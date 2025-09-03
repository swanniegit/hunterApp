// LEGO BUILDER - Utility Block: Progress Formatting
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Format completion progress as percentage

export const formatProgress = (completed: number, total: number): string => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  return `${percentage}% (${completed}/${total})`
}