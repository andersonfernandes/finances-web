import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LoadingBackdrop from '../../components/LoadingBackdrop'
import LoginError from './components/LoginError'
import { AuthContext } from '../../context/AuthContext'

const useStyles = makeStyles({
  root: {
    width: 500,
    padding: 50,
    margin: '0 auto',
  },
  heading : {
    marginBottom: 50,
  },
  input: {
    width: '100%',
    margin: '20px 0',
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
})

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {
    showErrors,
    handleLogin,
    loading,
  } = useContext(AuthContext)

  const classes = useStyles()
  const login = (event) => {
    event.preventDefault()
    handleLogin({ email, password })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.heading}>
        <Typography
          variant="h3"
          align="center"
        >
          Finances Web
        </Typography>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Login
        </Typography>
      </Box>

      <form onSubmit={ event => login(event) }>
        <TextField
          className={classes.input}
          autoFocus={true}
          type="email"
          label="Email"
          onChange={ event => setEmail(event.target.value) }
        />

        <TextField
          className={classes.input}
          type="password"
          label="Password"
          onChange={ event => setPassword(event.target.value) }
        />

        <Button
          className={classes.button}
          disabled={loading }
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Enter
        </Button>

        <LoadingBackdrop open={loading} />
      </form>

      <LoginError open={showErrors} />
    </Box>
  )
}

export default Login
