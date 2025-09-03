// LEGO BUILDER - Utility Block: Score Formatting
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Format numerical score to display string

export const formatScore = (score: number): string => {
  return `${Math.round(score)} pts`
}