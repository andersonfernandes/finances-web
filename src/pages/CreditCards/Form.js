import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import { InputAdornment } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { allFinancialInstitutions } from '../../adapters/api/financialInstitutions'
import { postCreditCard, putCreditCard } from '../../adapters/api/creditCards'

import AppContext from '../../context/AppContext'
import { creditCardDefaults, creditCardSchema } from '../../adapters/schemas/creditCard'

import {
  FormDialog,
  TextInput,
  SelectInput,
} from '../../components'

const Form = ({ open, setOpen, loadCreditCards, creditCard }) => {
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

  const handleAction = (formParams) => {
    const processAction = formParams.id ? putCreditCard : postCreditCard

    setLoading(true)

    processAction(formParams)
      .then(response => {
        const { status } = response

        if ([200, 201].includes(status)) {
          loadCreditCards()
          setOpen(false)
        } 
      })
      .finally(() => setLoading(false))
  } 

  return (
    <FormDialog
      title="Create Credit Card"
      action={handleSubmit(handleAction)}
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
