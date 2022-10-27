import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  Divider,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import AuthContext from '../../context/AuthContext'

const useStyles = makeStyles(theme => ({
  titleContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
  listItem: {
    width: 200,
  },
}))

const MenuDrawer = ({ open, setOpen, menuItems }) => {
  const { handleLogout } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

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
      <AppBar position="static" className={classes.titleContainer}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Finances App
          </Typography>
        </Toolbar>
      </AppBar>

      <Divider />

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

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  menuItems: PropTypes.array,
}

export default MenuDrawer
