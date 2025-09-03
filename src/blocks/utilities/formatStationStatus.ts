// LEGO BUILDER - Utility Block: Station Status Formatting
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Format station status with emoji indicators

export const formatStationStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'locked': 'Locked 🔒',
    'available': 'Start Now ▶️',
    'completed': 'Completed ✅'
  }
  return statusMap[status] || 'Unknown'
}