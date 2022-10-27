import React from 'react'

import { IconButton, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
		>
			<Alert severity={kind} variant="filled">
				{message}

				<IconButton size="small" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Alert>
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
