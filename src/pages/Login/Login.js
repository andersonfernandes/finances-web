import React, { useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LoadingBackdrop from '../../components/LoadingBackdrop'
import LoginError from './components/LoginError'
import { AuthContext } from '../../context/AuthContext'
import { Link as RouterLink, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '30%',
    padding: 50,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
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

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {
    showErrors,
    handleLogin,
    loading,
    authenticated,
  } = useContext(AuthContext)

  const classes = useStyles()
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
          variant="outlined"
          className={classes.input}
          autoFocus={true}
          type="email"
          label="Email"
          onChange={ event => setEmail(event.target.value) }
        />

        <TextField
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

      <LoginError open={showErrors} />
    </Box>
  )
}

export default Login
