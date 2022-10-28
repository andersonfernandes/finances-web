import React from 'react'
import PropTypes from 'prop-types'
import FormDialog from '../FormDialog'
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material'

const AccountSwitcher = ({
  open,
  setOpen,
}) => {
  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title="Switch Account"
    >
      {/* TODO: Fetch from API */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Account A" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Account B" />
          </ListItemButton>
        </ListItem>
      </List>
    </FormDialog>
  )
}

AccountSwitcher.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

export default AccountSwitcher
