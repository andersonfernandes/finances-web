import React, { useContext, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'

import { AuthContext } from '../../context/AuthContext'

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading : {
    marginTop: 150,
  },
  button: {
    marginTop: 150,
  },
})

const Home = () => {
  const history = useHistory()

  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    if (authenticated) history.push('/dashboard')
  }, [authenticated, history])

  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.heading}
        variant="h3"
        align="center"
      >
        Finances
      </Typography>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        component={RouterLink}
        to="/login"
      >
        Sign In
      </Button>
    </Box>
  )
}

export default Home
