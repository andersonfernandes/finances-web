import React, {
	useContext,
	useEffect,
	useState,
} from 'react'

import { Fab } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'

import CreditCardsService from '../../adapters/services/CreditCardsService'
import { creditCardDefaults } from '../../adapters/schemas/creditCard'
import AppContext from '../../context/AppContext'

import {
	AlertSnackbar,
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

	const {
		setLoading,
		setShowAlert,
		setAlertData,
	} = useContext(AppContext)
	const classes = useStyles()

	const loadCreditCards = () => {
		setLoading(true)

		CreditCardsService.loadCreditCards()
			.then(data => {
				setCreditCards(data)
				setLoading(false)
			})
	}

	useEffect(loadCreditCards, [setLoading])

	const handleCreate = () => {
		setFormValues(creditCardDefaults)
		setOpenCreateForm(true)
	}

	const handleEdit = (creditCard) => {
		setLoading(true)

		CreditCardsService.loadCreditCardById(creditCard.id)
			.then(data => {
				setFormValues(data)
				setOpenCreateForm(true)
				setLoading(false)
			})
	}

	const handleDelete = (creditCard) => {
		CreditCardsService.deleteCreditCard(creditCard.id)
			.then(() => {
				loadCreditCards()
				setAlertData({
					message: 'Credit Card deleted with success!',
					kind: AlertSnackbar.kinds.success,
				})
			})
			.catch(() => {
				setAlertData({
					message: 'Unabled to delete Credit Card!',
					kind: AlertSnackbar.kinds.error,
				})
			})
			.finally(() => setShowAlert(true))
	}

	const actionsMenu = [
		{ title: 'Edit', action: handleEdit },
		{ title: 'Delete', action: handleDelete, withConfirmation: true },
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
