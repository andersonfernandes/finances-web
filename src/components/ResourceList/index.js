import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import ConfirmDialog from '../ConfirmDialog'

const ResourceList = ({
  items,
  actionsMenu,
}) => {
  const [itemMenuAnchorEl, setItemMenuAnchorEl] = useState(
    new Array(items.length).fill(null)
  )
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmDialogAction, setConfirmDialogAction] = useState(() => {})

  const handleMenuToggle = (index, element) => {
    setItemMenuAnchorEl(prev => {
      prev[index] = element
      return [...prev]
    })
  }

  const handleAction = (index, item, actionItem) => {
    handleMenuToggle(index, null)

    const { action, withConfirmation } = actionItem

    if (withConfirmation) {
      setOpenConfirmDialog(true)
      setConfirmDialogAction(() => {
        return () => action(item)
      })
    } else {
      action(item)
    }
  }

  const textToLetterAvatar = (text) => {
    return text.split(' ').map(word => word[0].toUpperCase()).join('')
  }

  return <>
    <List>
      {items.map((item, index) => {
        return (
          <ListItem key={item.title} button>
            <ListItemAvatar>
              {item.icon ? <Avatar alt={item.title} src={item.icon} /> : <Avatar>{textToLetterAvatar(item.title)}</Avatar>}
            </ListItemAvatar>

            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
            />

            <ListItemSecondaryAction>
              <IconButton onClick={event => handleMenuToggle(index, event.target)} size="large">
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={itemMenuAnchorEl[index]}
                keepMounted
                open={Boolean(itemMenuAnchorEl[index])}
                onClose={() => handleMenuToggle(index, null)}
              >
                {actionsMenu.map(actionItem => {
                  return ( 
                    <MenuItem key={actionItem.title} onClick={() => handleAction(index, item, actionItem)}>
                      {actionItem.title}
                    </MenuItem>
                  )
                })}
              </Menu>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>

    <ConfirmDialog
      open={openConfirmDialog}
      setOpen={setOpenConfirmDialog}
      confirmAction={confirmDialogAction}
      title="Are you sure?"
    />
  </>
}

ResourceList.propTypes = {
  items: PropTypes.array,
  actionsMenu: PropTypes.array,
}

export default ResourceList 
