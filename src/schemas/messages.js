export const ErrorMessages = {
  REQUIRED: 'This field is required',
  NUMBER: 'This field must be a number',
  SELECT: 'Some option must be selected',
  MIN: (field) => `Must be greater or equal to ${field.min}`,
  MAX: (field) => `Must be less or equal to ${field.max}`,
}
