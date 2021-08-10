import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import { Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { creditCardResponseToFullEntity, creditCardResponseToSimpleEntity } from '../../adapters/parsers/creditCards'
import { allCreditCards, deleteCreditCards, fetchCreditCard } from '../../adapters/api/creditCards'
import { creditCardDefaults } from '../../adapters/schemas/creditCard'
import AppContext from '../../context/AppContext'

import {
  BaseLayout,
  ResourceList as List,
} from '../../components'

import Form from './Form'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const CreditCards = () => {
  const [creditCards, setCreditCards] = useState([])
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [formValues, setFormValues] = useState(creditCardDefaults)

  const { setLoading } = useContext(AppContext)
  const classes = useStyles()

  const loadCreditCards = () => {
    setLoading(true)

    allCreditCards()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          const parsedData = data.map(creditCardResponseToSimpleEntity)
          setCreditCards(parsedData)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(loadCreditCards, [setLoading])

  const handleCreate = () => {
    setFormValues(creditCardDefaults)
    setOpenCreateForm(true)
  }

  const handleEdit = (creditCard) => {
    setLoading(true)

    fetchCreditCard(creditCard.id)
      .then((response => {
        const { status, data } = response

        if (status === 200) {
          setFormValues(creditCardResponseToFullEntity(data))
          setOpenCreateForm(true)
        }
      }))
      .finally(() => setLoading(false))
  }

  const handleDelete = (creditCard) => {
    deleteCreditCards(creditCard.id)
      .then(() => {
        loadCreditCards()
      })
  }

  const actionsMenu = [
    { title: 'Edit', action: handleEdit },
    { title: 'Delete', action: handleDelete },
  ]

  return (
    <BaseLayout>
      <List items={creditCards} actionsMenu={actionsMenu} />
      <Form
        open={openCreateForm}
        setOpen={setOpenCreateForm}
        creditCard={formValues}
        loadCreditCards={loadCreditCards}
      />

      <Fab color="primary" className={classes.fab} onClick={handleCreate}>
        <AddIcon />
      </Fab>
    </BaseLayout>
  )
}

export default CreditCards
