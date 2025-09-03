// LEGO BUILDER - Utility Block: Team Members Formatting
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Format team members list for display

export const formatTeamMembers = (members: string[]): string => {
  if (members.length === 0) return 'No members'
  if (members.length <= 3) return members.join(', ')
  return `${members.slice(0, 2).join(', ')} and ${members.length - 2} others`
}