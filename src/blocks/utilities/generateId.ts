// LEGO BUILDER - Utility Block: ID Generation
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Generate unique alphanumeric ID

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}