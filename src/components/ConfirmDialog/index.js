import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const renderContent = (message) => {
  return (
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
  )
}

const ConfirmDialog = ({
  open,
  setOpen,
  title,
  message,
  confirmAction,
}) => {
  const handleClose = () => setOpen(false)
  const handleConfirm = () => {
    setOpen(false)
    confirmAction()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>

      {message && renderContent(message)}

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmAction: PropTypes.func,
}

export default ConfirmDialog
