import * as yup from 'yup'

import { ErrorMessages } from './messages'
const { REQUIRED, NUMBER, SELECT, MAX, MIN } = ErrorMessages

const creditCardSchema = yup.object().shape({
  name: yup.string().required(REQUIRED),
  closing_day: yup.number().integer().min(1, MIN).max(31,  MAX).typeError(NUMBER).required(REQUIRED),
  due_day: yup.number().integer().min(1, MIN).max(31, MAX).typeError(NUMBER).required(REQUIRED),
  limit: yup.number().min(1, MIN).typeError(NUMBER).required(REQUIRED),
  financial_institution_id: yup.number().positive().integer().typeError(SELECT).required(REQUIRED),
})

const creditCardDefaults = {
  name: '',
  closing_day: '',
  due_day: '',
  limit: '',
  financial_institution_id: '',
}

export { creditCardSchema, creditCardDefaults }
