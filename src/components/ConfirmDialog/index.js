import React from 'react'

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

export default ConfirmDialog
