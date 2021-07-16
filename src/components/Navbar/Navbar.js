import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import MenuDrawer from '../MenuDrawer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar = ({ menuItems }) => {
  const location = useLocation()

  const [openMenu, setOpenMenu] = useState(false)
  const [title, setTitle] = useState('')

  const classes = useStyles()

  useEffect(() => {
    const currentMenuItem = menuItems.find(item => {
      return item.path === location.pathname
    })

    setTitle(currentMenuItem.title)
  }, [location, menuItems])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <MenuDrawer open={openMenu} setOpen={setOpenMenu} menuItems={menuItems} />
    </div>
  )
}

export default Navbar
