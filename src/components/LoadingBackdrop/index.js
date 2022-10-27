import React from 'react'
import PropTypes from 'prop-types'

import {
	Backdrop,
	CircularProgress,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
	backdrop: {
		zIndex: 1000,
		color: '#fff',
	}
})

const LoadingBackdrop = ({ open }) => {
	const classes = useStyles()

	return (
		<Backdrop
			className={classes.backdrop}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}

LoadingBackdrop.propTypes = {
	open: PropTypes.bool,
}

export default LoadingBackdrop
