import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

import FormDialog from '../../components/FormDialog'
import { allFinancialInstitutions } from '../../api/financial_institutions'
import { createCreditCard } from '../../api/credit_cards'
import AppContext from '../../context/AppContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}))

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
  const classes = useStyles()

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
      .then(response => {
        const { status } = response

        if (status === 201) {
        setOpen(false)
        setCreditCard(initialCreditCard)
        }
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
      saveAction={createAction}
      open={open}
      setOpen={setOpen}
    >
      <FormControl className={classes.formControl}>
        <TextField
          required
          id="name"
          label="Name"
          variant="outlined"
          value={creditCard.name}
          onChange={event => handleInputChange('name', event.target.value)}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          required
          id="closing_day"
          label="Closing Day"
          variant="outlined"
          value={creditCard.closing_day}
          onChange={event => handleInputChange('closing_day', event.target.value)}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          required
          id="due_day"
          label="Due Day"
          variant="outlined"
          value={creditCard.due_day}
          onChange={event => handleInputChange('due_day', event.target.value)}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          required
          id="limit"
          label="Limit"
          variant="outlined"
          value={creditCard.limit}
          onChange={event => handleInputChange('limit', event.target.value)}
        />
      </FormControl>

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="financial_institution_id_label">Financial Institution</InputLabel>
        <Select
          id="financial_institution_id"
          labelId="financial_institution_id_label"
          label="Financial Institution"
          value={creditCard.financial_institution_id}
          onChange={event => handleInputChange('financial_institution_id', event.target.value)}
        >
          <MenuItem selected value=""><em>None</em></MenuItem>

          {financialInstitutions.map(financialInstitution => {
            return (
              <MenuItem
                key={financialInstitution.id}
                value={financialInstitution.id}
              >
                {financialInstitution.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </FormDialog>
  )
}

export default Form
