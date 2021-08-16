import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import { InputAdornment } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { allFinancialInstitutions } from '../../adapters/api/financialInstitutions'

import AppContext from '../../context/AppContext'
import { creditCardDefaults, creditCardSchema } from '../../adapters/schemas/creditCard'
import CreditCardsService from '../../adapters/services/CreditCardsService'

import {
  FormDialog,
  TextInput,
  SelectInput,
} from '../../components'

const Form = ({
  open,
  setOpen,
  loadCreditCards,
  creditCard,
}) => {
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(creditCardSchema),
    reValidateMode: 'onChange',
    defaultValues: creditCardDefaults,
  })

  const [financialInstitutions, setFinancialInstitutions] = useState([])
  const { setLoading } = useContext(AppContext)

  useEffect(() => reset(creditCard), [creditCard, reset])

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

  const handleSubmitAction = (formParams) => {
    setLoading(true)

    CreditCardsService.saveCreditCard(formParams)
      .then(() => {
        reset(creditCardDefaults)
        loadCreditCards()
        setOpen(false)
        setLoading(false)
      })
  }

  const formTitle = creditCard.id ? 'Update' : 'Create'

  return (
    <FormDialog
      title={`${formTitle} Credit Card`}
      action={handleSubmit(handleSubmitAction)}
      open={open}
      setOpen={setOpen}
      onClose={reset}
    >
      <TextInput control={control} name="name" label="Name" />
      <TextInput control={control} name="closing_day" label="Closing Day" />
      <TextInput control={control} name="due_day" label="Due Day" />
      <TextInput
        control={control}
        name="limit"
        label="Limit"
        inputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <SelectInput
        control={control}
        name={'financial_institution_id'}
        label="Financial Institution"
        options={financialInstitutions}
      />
    </FormDialog>
  )
}

export default Form
