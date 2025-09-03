// LEGO BUILDER - Utility Block: Timestamp Formatting
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Format ISO timestamp to readable date/time

export const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}