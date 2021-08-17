import React from 'react'

import { IconButton, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

const AlertSnackbar = ({
  open,
  setOpen,
  message,
  kind,
}) => {
  const handleClose = () => setOpen(false)

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <MuiAlert severity={kind} variant="filled">
        {message}

        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </MuiAlert>
    </Snackbar>
  )
}

AlertSnackbar.kinds = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

export default AlertSnackbar
