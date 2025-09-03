// LEGO BUILDER - Utility Block: Input Sanitization
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Sanitize user input by removing unsafe characters

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}