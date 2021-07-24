import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import { Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { allCreditCards, deleteCreditCards } from '../../api/credit_cards'
import BaseLayout from '../../components/BaseLayout'
import AppContext from '../../context/AppContext'
import { default as List } from '../../components/ResourceList'
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

  useEffect(() => {
    setLoading(true)

    allCreditCards()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          const parsedData = data.map(item => {
            const {
              id,
              name,
              account: {
                financial_institution: { logo_url }
              }
            } = item

            return {
              id: id,
              title: name,
              icon: logo_url,
            }
          })

          setCreditCards(parsedData)
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading])

  const handleDelete = (id) => {
    deleteCreditCards(id)
      .then(() => {
        console.log('Apagou')
      })
  }

  return (
    <BaseLayout>
      <List items={creditCards} deleteAction={handleDelete} />
      <Form open={openCreateForm} setOpen={setOpenCreateForm} />

      <Fab color="primary" className={classes.fab} onClick={() => setOpenCreateForm(true)}>
        <AddIcon />
      </Fab>
    </BaseLayout>
  )
}

export default CreditCards
