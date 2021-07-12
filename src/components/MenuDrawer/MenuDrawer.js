import React, {useContext} from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  SwipeableDrawer,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { AuthContext } from '../../context/AuthContext'

const useStyles = makeStyles({
  listItem: {
    width: 200,
  },
})

const MenuDrawer = ({ open, setOpen }) => {
  const classes = useStyles()
  const { handleLogout } = useContext(AuthContext)

  const toggleDrawer = (event, state) => {
    if (!event) return

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpen(state)
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={(event) => toggleDrawer(event, true)}
      onClose={(event) => toggleDrawer(event, false)}
    >
      <List>
        <ListItem
          button
          key="logout"
          className={classes.listItem}
          onClick={() => handleLogout()}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

export default MenuDrawer
