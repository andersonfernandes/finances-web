import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom"

import { fetchTokens } from '../../services/authentication'
import LoadingBackdrop from '../LoadingBackdrop'
import LoginError from './LoginError'

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
  const history = useHistory()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [showErrors, setShowErrors] = React.useState(false)

  const classes = useStyles()
  const login = (event) => {
    event.preventDefault()

    setShowErrors(false)
    setLoading(true)
    fetchTokens({ email, password })
      .then(() => history.push('/'))
      .catch(() => setShowErrors(true))
      .finally((() => setLoading(false)))
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

      <LoginError
        open={showErrors}
        setOpen={setShowErrors}
      />
    </Box>
  )
}

export default Login
