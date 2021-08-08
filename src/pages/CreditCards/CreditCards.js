import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import { Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { creditCardResponseToEntity } from '../../utils/parsers/creditCards'
import { allCreditCards, deleteCreditCards } from '../../api/credit_cards'
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
  const { setLoading } = useContext(AppContext)
  const classes = useStyles()

  const loadCreditCards = () => {
    setLoading(true)

    allCreditCards()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          const parsedData = data.map(creditCardResponseToEntity)
          setCreditCards(parsedData)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(loadCreditCards, [setLoading])

  const handleDelete = (id) => {
    deleteCreditCards(id)
      .then(() => {
        console.log('Apagou')
      })
  }

  return (
    <BaseLayout>
      <List items={creditCards} deleteAction={handleDelete} />
      <Form open={openCreateForm} setOpen={setOpenCreateForm} loadCreditCards={loadCreditCards} />

      <Fab color="primary" className={classes.fab} onClick={() => setOpenCreateForm(true)}>
        <AddIcon />
      </Fab>
    </BaseLayout>
  )
}

export default CreditCards
