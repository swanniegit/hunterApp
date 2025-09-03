// LEGO BUILDER - Utility Block: Team Members Validation
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Team members validation rules

import type { ValidationResult } from '../../types'
import { validateValue } from './validateValue'

export const validateTeamMembers = (members: string[]): ValidationResult => {
  if (members.length < 1) {
    return { isValid: false, errors: ['At least one team member is required'] }
  }
  
  if (members.length > 5) {
    return { isValid: false, errors: ['Maximum 5 team members allowed'] }
  }
  
  const memberErrors = members
    .map(member => validateValue({
      value: member,
      rules: [
        { type: 'required', message: 'Member name is required' },
        { type: 'minLength', value: 2, message: 'Member name too short' }
      ]
    }))
    .filter(result => !result.isValid)
    .flatMap(result => result.errors)
  
  return {
    isValid: memberErrors.length === 0,
    errors: memberErrors
  }
}