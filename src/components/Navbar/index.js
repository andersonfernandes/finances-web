import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount'

import MenuDrawer from '../MenuDrawer'
import AccountSwitcher from '../AccountSwitcher'
import AppContext from '../../context/AppContext'

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
  const [openAccountsSwtcher, setOpenAccountsSwtcher] = useState(false)
  const [title, setTitle] = useState('')

  const { currentAccount, showAccountSwitcher } = useContext(AppContext)

  const classes = useStyles()

  useEffect(() => {
    const currentMenuItem = menuItems.find(item => {
      return item.path === location.pathname
    })

    setTitle(currentMenuItem.title)
  }, [location, menuItems])

  useEffect(() => {
    if (showAccountSwitcher) setOpenAccountsSwtcher(true)
  }, [showAccountSwitcher])

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
            size="large">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {`${title} - ${currentAccount && currentAccount.name}`}
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpenAccountsSwtcher(true)}
            size="large">
            <SwitchAccountIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MenuDrawer open={openMenu} setOpen={setOpenMenu} menuItems={menuItems} />
      <AccountSwitcher
        open={openAccountsSwtcher}
        setOpen={setOpenAccountsSwtcher}
        canBeClosed={!!currentAccount}
      />
    </div>
  )
}

Navbar.propTypes = {
  menuItems: PropTypes.array,
}

export default Navbar
