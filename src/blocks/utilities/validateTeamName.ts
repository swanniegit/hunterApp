// LEGO BUILDER - Utility Block: Team Name Validation
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Team name validation rules

import type { ValidationResult } from '../../types'
import { validateValue } from './validateValue'

export const validateTeamName = (name: string): ValidationResult => {
  return validateValue({
    value: name,
    rules: [
      { type: 'required', message: 'Team name is required' },
      { type: 'minLength', value: 2, message: 'Team name must be at least 2 characters' },
      { type: 'maxLength', value: 50, message: 'Team name must be less than 50 characters' }
    ]
  })
}