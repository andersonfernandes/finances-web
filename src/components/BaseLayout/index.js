import React, { useContext } from 'react'

import { Container } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CreditCardIcon from '@mui/icons-material/CreditCard'

import AppContext from '../../context/AppContext'
import { Navbar, LoadingBackdrop, AlertSnackbar } from '../../components'

const BaseLayout = ({ children }) => {
	const {
		loading,
		showAlert,
		setShowAlert,
		alertData,
	} = useContext(AppContext)

	const menuItems = [
		{ title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
		{ title: 'Credit Cards', path: '/credit_cards', icon: <CreditCardIcon /> },
	]

	return (
		<>
			<LoadingBackdrop open={loading} />
			<Navbar menuItems={menuItems} />

			<Container>
				{children}
			</Container>

			<AlertSnackbar
				open={showAlert}
				setOpen={setShowAlert}
				message={alertData.message}
				kind={alertData.kind}
			/>
		</>
	)
}

export default BaseLayout
