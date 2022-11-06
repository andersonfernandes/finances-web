import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import FormDialog from '../FormDialog'
import AppContext from '../../context/AppContext'
import AccountsService from '../../adapters/services/AccountsService'

const AccountSwitcher = ({
  open,
  setOpen,
  canBeClosed,
}) => {
  const [accounts, setAccounts] = useState([])
  const [showAlert, setShowAlert] = useState(!canBeClosed)

  const { setLoading, handleAccountSwitch } = useContext(AppContext)

  useEffect(() => {
    setLoading(true)

    AccountsService.loadAccounts()
      .then(data => {
        setAccounts(data)
        setLoading(false)
      })
  }, [])

  const handleAccountClick = (account) => {
    handleAccountSwitch(account) 
    setOpen(false)
  }

  return (
    <FormDialog
      open={open}
      setOpen={canBeClosed ? setOpen : () => {}}
      title="Select the Account"
    >
      <List>
        {accounts.map(account => (
          <ListItem disablePadding key={account.name}>
            <ListItemButton onClick={() => handleAccountClick(account)}>
              <ListItemText primary={account.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {!canBeClosed && <AlertSnackbar
        open={showAlert}
        setOpen={setShowAlert}
        message={'Select an account before continue!'}
        kind={AlertSnackbar.kinds.info}
      />}
    </FormDialog>
  )
}

AccountSwitcher.defaultProps = {
  canBeClosed: true,
}

AccountSwitcher.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  canBeClosed: PropTypes.bool,
}

export default AccountSwitcher
