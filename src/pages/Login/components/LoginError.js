import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const LoginError = ({ open }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <MuiAlert severity="error">
        Invalid Email or Password!
      </MuiAlert>
    </Snackbar>
  )
}

export default LoginError
