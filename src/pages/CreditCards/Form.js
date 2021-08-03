import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import FormDialog from '../../components/FormDialog'
import { allFinancialInstitutions } from '../../api/financial_institutions'
import AppContext from '../../context/AppContext'
import createCreditCard from '../../services/creditCards/creator'
import TextInput from '../../components/TextInput'
import SelectInput from '../../components/SelectInput'

const initialCreditCard = {
  name: '',
  closing_day: '',
  due_day: '',
  limit: '',
  financial_institution_id: '',
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

    createCreditCard(creditCard)
      .then(() => {
        setOpen(false)
        setCreditCard(initialCreditCard)
      })
      .finally(() => setLoading(false))
  }

  const handleInputChange = (input, value) => {
    const creditCardCopy = { ...creditCard }
    creditCardCopy[input] = value

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
        value={creditCard.name}
        label="Name"
        onChange={event => handleInputChange('name', event.target.value)}
      />

      <TextInput
        required
        value={creditCard.closing_day}
        label="Closing Day"
        onChange={event => handleInputChange('closing_day', event.target.value)}
      />

      <TextInput
        required
        value={creditCard.due_day}
        label="Due Day"
        onChange={event => handleInputChange('due_day', event.target.value)}
      />

      <TextInput
        required
        value={creditCard.limit}
        label="Limit"
        onChange={event => handleInputChange('limit', event.target.value)}
      />

      <SelectInput
        required
        value={creditCard.financial_institution_id}
        label="Financial Institution"
        onChange={event => handleInputChange('financial_institution_id', event.target.value)}
        options={financialInstitutions}
      />
    </FormDialog>
  )
}

export default Form
