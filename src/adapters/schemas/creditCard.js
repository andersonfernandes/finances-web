import * as yup from 'yup'

import { REQUIRED, NUMBER, MAX, MIN } from './defaultMessages'

const creditCardSchema = yup.object().shape({
  name: yup.string().required(REQUIRED),
  billing_day: yup.number().integer().min(1, MIN).max(31,  MAX).typeError(NUMBER).required(REQUIRED),
  limit: yup.number().min(1, MIN).typeError(NUMBER).required(REQUIRED),
})

const creditCardDefaults = {
  name: '',
  billing_day: '',
  limit: '',
}

export { creditCardSchema, creditCardDefaults }
