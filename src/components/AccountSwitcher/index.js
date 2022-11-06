import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import FormDialog from '../FormDialog'
import AppContext from '../../context/AppContext'
import AccountsService from '../../adapters/services/AccountsService'

const AccountSwitcher = ({
  open,
  setOpen,
}) => {
  const [accounts, setAccounts] = useState([])

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
      setOpen={setOpen}
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
    </FormDialog>
  )
}

AccountSwitcher.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

export default AccountSwitcher
