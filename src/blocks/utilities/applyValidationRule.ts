// LEGO BUILDER - Utility Block: Single Rule Application
// ASSIGNED CODER: Claude | REWRITE TIME: 2 minutes
// SINGLE RESPONSIBILITY: Apply single validation rule

import type { ValidationRule } from '../../types'

export const applyValidationRule = (value: any, rule: ValidationRule): string | null => {
  switch (rule.type) {
    case 'required':
      return !value || value.trim() === '' ? rule.message : null
    case 'minLength':
      return value && value.length < rule.value ? rule.message : null
    case 'maxLength':
      return value && value.length > rule.value ? rule.message : null
    case 'pattern':
      return value && !new RegExp(rule.value).test(value) ? rule.message : null
    default:
      return null
  }
}