import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';

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
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const classes = useStyles()
  const login = (event) => {
    event.preventDefault()

    console.log(email, password)
  }

  return (
    <Box className={ classes.root }>
      <Box className={ classes.heading }>
        <Typography
          variant="h3"
          align="center"
        >
          Finances Web
        </Typography>
        <Typography
          variant={ 'h4' }
          align="center"
          gutterBottom
        >
          Login
        </Typography>
      </Box>

      <form onSubmit={ event => login(event) }>
        <TextField
          className={ classes.input }
          autoFocus={ true }
          type="email"
          label="Email"
          value={ email }
          onChange={ event => setEmail(event.target.value) }
        />

        <TextField
          className={ classes.input }
          type="password"
          label="Password"
          value={ password }
          onChange={ event => setPassword(event.target.value) }
        />

        <Button
          className={ classes.button }
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Enter
        </Button>
      </form>
    </Box>
  )
}

export default Login
