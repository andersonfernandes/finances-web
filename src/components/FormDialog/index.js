import React from 'react'
import PropTypes from 'prop-types'

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

  const ActionButton = () => (
    <Button autoFocus color="inherit" onClick={action}>
      save
    </Button>
  )

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            size="large">
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          {action && <ActionButton />}
        </Toolbar>
      </AppBar>

      <Container>
        {children}
      </Container>
    </Dialog>
  )
}

FormDialog.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

FormDialog.defaultProps = {
  onClose: () => {},
}

export default FormDialog
