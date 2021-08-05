import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import { InputAdornment } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { allFinancialInstitutions } from '../../api/financial_institutions'
import { postCreditCard } from '../../api/credit_cards'

import AppContext from '../../context/AppContext'
import { creditCardDefaults, creditCardSchema } from '../../schemas/creditCard'

import {
  FormDialog,
  TextInput,
  SelectInput,
} from '../../components'

const Form = ({ open, setOpen }) => {
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(creditCardSchema),
    defaultValues: creditCardDefaults
  })

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

  const createAction = (data) => {
    setLoading(true)

    postCreditCard(data)
      .then(response => {
        const { status } = response

        if (status === 201) {
          setOpen(false)
          reset()
        } 
      })
      .finally(() => setLoading(false))
  }

  return (
    <FormDialog
      title="Create Credit Card"
      action={handleSubmit(createAction)}
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
