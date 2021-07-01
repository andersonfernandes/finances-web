import React from 'react'
import {Backdrop, CircularProgress, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  }
})

const LoadingBackdrop = ({open}) => {
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

export default LoadingBackdrop
