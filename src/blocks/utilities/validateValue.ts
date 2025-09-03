// LEGO BUILDER - Utility Block: Core Validation Function
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Pure validation function orchestration

import type { ValidationResult, ValidatorInput } from '../../types'
import { applyValidationRule } from './applyValidationRule'

export const validateValue = ({ value, rules }: ValidatorInput): ValidationResult => {
  const errors: string[] = []
  
  for (const rule of rules) {
    const error = applyValidationRule(value, rule)
    if (error) errors.push(error)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}