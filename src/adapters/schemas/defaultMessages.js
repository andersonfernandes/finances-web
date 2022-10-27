export const REQUIRED = 'This field is required'
export const NUMBER = 'This field must be a number'
export const SELECT = 'Some option must be selected'
export const MIN = (field) => `Must be greater or equal to ${field.min}`
export const MAX = (field) => `Must be less or equal to ${field.max}`
