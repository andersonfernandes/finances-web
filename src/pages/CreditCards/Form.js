import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import { allFinancialInstitutions } from '../../api/financial_institutions'
import { buildRequestFromInputData } from '../../utils/formHelpers'
import createCreditCard from '../../services/creditCards/creator'
import AppContext from '../../context/AppContext'

import {
  FormDialog,
  TextInput,
  SelectInput,
} from '../../components'

const initialCreditCard = {
  name: { value: '', hasError: false, errorText: null },
  closing_day: { value: '', hasError: false, errorText: null },
  due_day: { value: '', hasError: false, errorText: null },
  limit: { value: '', hasError: false, errorText: null },
  financial_institution_id: { value: '', hasError: false, errorText: null },
}

const Form = ({ open, setOpen }) => {
  const [creditCard, setCreditCard] = useState(initialCreditCard)
  const [financialInstitutions, setFinancialInstitutions] = useState([])
  const { setLoading } = useContext(AppContext)

  useEffect(() => {
    setLoading(true)

    allFinancialInstitutions()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          setFinancialInstitutions(data)
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading])

  const createAction = () => {
    setLoading(true)

    createCreditCard(buildRequestFromInputData(creditCard))
      .then(() => {
        setOpen(false)
        setCreditCard(initialCreditCard)
      })
      .finally(() => setLoading(false))
  }

  const handleInputChange = (input, value) => {
    const creditCardCopy = { ...creditCard }
    creditCardCopy[input].value = value

    setCreditCard({...creditCardCopy})
  }

  return (
    <FormDialog
      title="Create Credit Card"
      action={createAction}
      open={open}
      setOpen={setOpen}
    >
      <TextInput
        required
        {...creditCard.name}
        label="Name"
        onChange={event => handleInputChange('name', event.target.value)}
      />

      <TextInput
        required
        {...creditCard.closing_day}
        label="Closing Day"
        onChange={event => handleInputChange('closing_day', event.target.value)}
      />

      <TextInput
        required
        {...creditCard.due_day}
        label="Due Day"
        onChange={event => handleInputChange('due_day', event.target.value)}
      />

      <TextInput
        required
        {...creditCard.limit}
        label="Limit"
        onChange={event => handleInputChange('limit', event.target.value)}
      />

      <SelectInput
        required
        {...creditCard.financial_institution_id}
        label="Financial Institution"
        onChange={event => handleInputChange('financial_institution_id', event.target.value)}
        options={financialInstitutions}
      />
    </FormDialog>
  )
}

export default Form
