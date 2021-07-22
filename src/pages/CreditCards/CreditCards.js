import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import { Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { allCreditCards } from '../../api/credit_cards'
import BaseLayout from '../../components/BaseLayout'
import AppContext from '../../context/AppContext'
import { default as List } from '../../components/ResourceList'
import FormDialog from '../../components/FormDialog'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const CreditCards = () => {
  // TODO: Change to empty array
  const [creditCards, setCreditCards] = useState([
    { title: 'Nubank', icon: 'data:image/png;base64,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' },
    { title: 'C6', icon: 'https://pbs.twimg.com/profile_images/1110989477508513792/JpYL-X0j.png' },
  ])
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const { setLoading } = useContext(AppContext)
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)

    allCreditCards()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          setCreditCards(prev => [...prev, ...data])
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading])

  const createAction = () => {
    alert('Salvando Form')
  }

  return (
    <BaseLayout>
      <List items={creditCards} />

      <FormDialog
        title="Create Credit Card"
        saveAction={createAction}
        open={openCreateForm}
        setOpen={setOpenCreateForm}
      >

      </FormDialog>

      <Fab color="primary" className={classes.fab} onClick={() => setOpenCreateForm(true)}>
        <AddIcon />
      </Fab>
    </BaseLayout>
  )
}

export default CreditCards
