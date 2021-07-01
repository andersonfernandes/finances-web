import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const LoginError = ({ open, setOpen }) => {
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        onClose={handleClose}
        severity="error"
      >
        Email ou senha inválido!
      </MuiAlert>
    </Snackbar>
  )
}

export default LoginError
