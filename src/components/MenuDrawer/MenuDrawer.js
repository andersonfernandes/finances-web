import React, {useContext} from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  SwipeableDrawer,
  Divider,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory, useLocation } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

const useStyles = makeStyles({
  listItem: {
    width: 200,
  },
})

const MenuDrawer = ({ open, setOpen }) => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const { handleLogout } = useContext(AuthContext)

  const toggleDrawer = (event, state) => {
    if (!event) return

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpen(state)
  }

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Credit Cards', path: '/credit_cards', icon: <CreditCardIcon /> },
  ]

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={(event) => toggleDrawer(event, true)}
      onClose={(event) => toggleDrawer(event, false)}
    >
      <List>
        {menuItems.map(item => {
          return (
            <ListItem
              button
              key={item.path}
              selected={location.pathname === item.path}
              className={classes.listItem}
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItem>
          )
        })}

        <Divider />

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
