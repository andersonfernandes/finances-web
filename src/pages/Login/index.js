import React, { useContext, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import { Box, Button, Grid, Typography, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

import AuthContext from '../../context/AuthContext'

import { AlertSnackbar, LoadingBackdrop } from '../../components'

const useStyles = makeStyles(theme => ({
	root: {
		width: '30%',
		padding: 50,
		margin: '0 auto',
		[theme.breakpoints.down('lg')]: {
			width: '100%',
		},
		[theme.breakpoints.only('md')]: {
			width: '50%',
		},
	},
	heading : {
		marginBottom: '25%',
	},
	input: {
		width: '100%',
		margin: '20px 0',
	},
	buttonGroup: {
		marginTop: 40,
		textAlign: 'center',
	},
}))

const Login = () => {
	const history = useHistory()
	const classes = useStyles()

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const {
		showErrors,
		setShowErrors,
		handleLogin,
		loading,
		authenticated,
	} = useContext(AuthContext)

	const login = (event) => {
		event.preventDefault()
		handleLogin({ email, password })
	}

	useEffect(() => {
		if (authenticated) history.push('/dashboard')
	}, [authenticated, history])

	return (
		<Box className={classes.root}>
			<Box className={classes.heading}>
				<Typography
					variant="h3"
					align="center"
				>
          Finances
				</Typography>

				<Typography
					variant="h4"
					align="center"
					gutterBottom
				>
          Sign In
				</Typography>
			</Box>

			<form onSubmit={ event => login(event) }>
				<TextField
					id="email"
					variant="outlined"
					className={classes.input}
					autoFocus={true}
					type="email"
					label="Email"
					onChange={ event => setEmail(event.target.value) }
				/>

				<TextField
					id="password"
					variant="outlined"
					className={classes.input}
					type="password"
					label="Password"
					onChange={ event => setPassword(event.target.value) }
				/>

				<Grid container className={classes.buttonGroup}>
					<Grid item xs={6}>
						<Button
							disabled={loading}
							variant="contained"
							color="primary"
							size="large"
							type="submit"
						>
              Enter
						</Button>
					</Grid>

					<Grid item xs={6}>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							component={RouterLink}
							to="/"
						>
              Back
						</Button>
					</Grid>

				</Grid>

				<LoadingBackdrop open={loading} />
			</form>

			<AlertSnackbar
				open={showErrors}
				setOpen={setShowErrors}
				message={'Invalid Email or Password!'}
				kind={AlertSnackbar.kinds.error}
			/>
		</Box>
	)
}

export default Login
