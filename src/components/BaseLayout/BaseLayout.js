import React, { useContext } from 'react'

import { Container } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import ListIcon from '@material-ui/icons/List'

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
    { title: 'Transactions', path: '/transactions', icon: <ListIcon /> },
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
