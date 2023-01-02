import React, {
  useContext,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { InputAdornment } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AppContext from '../../context/AppContext'
import { creditCardDefaults, creditCardSchema } from '../../adapters/schemas/creditCard'
import CreditCardsService from '../../adapters/services/CreditCardsService'

import {
  AlertSnackbar,
  FormDialog,
  TextInput,
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

  const { 
    setLoading,
    setShowAlert,
    setAlertData,
  } = useContext(AppContext)

  useEffect(() => reset(creditCard), [creditCard, reset])

  const handleSubmitAction = (formParams) => {
    setLoading(true)

    CreditCardsService.saveCreditCard(formParams)
      .then(() => {
        reset(creditCardDefaults)
        loadCreditCards()
        setOpen(false)
        setLoading(false)
        setAlertData({
          message: 'Credit Card saved with success!',
          kind: AlertSnackbar.kinds.success,
        })
      })
      .catch(() => {
        setAlertData({
          message: 'Unabled to save Credit Card!',
          kind: AlertSnackbar.kinds.error,
        })
      })
      .finally(() => setShowAlert(true))
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
      <TextInput control={control} name="billing_day" label="Billing Day" />
      <TextInput
        control={control}
        name="limit"
        label="Limit"
        inputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </FormDialog>
  )
}

Form.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  loadCreditCards: PropTypes.func,
  creditCard: PropTypes.object,
}

export default Form
