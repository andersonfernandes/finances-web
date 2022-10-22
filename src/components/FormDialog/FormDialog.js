import React from 'react'

import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    marginBottom: '50px',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FormDialog = ({
  title,
  action,
  open,
  setOpen,
  onClose,
  children,
}) => {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
    setOpen(false)
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={action}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {children}
      </Container>
    </Dialog>
  )
}

export default FormDialog
