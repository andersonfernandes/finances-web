import React, { useState } from 'react'

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
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const ResourceList = ({
  items,
  actionsMenu,
}) => {
  const [itemMenuAnchorEl, setItemMenuAnchorEl] = useState(
    new Array(items.length).fill(null)
  )

  const handleMenuToggle = (index, element) => {
    setItemMenuAnchorEl(prev => {
      prev[index] = element
      return [...prev]
    })
  }

  const handleAction = (index, item, action) => {
    handleMenuToggle(index, null)
    if (action) action(item) 
  }

  return (
    <List>
      {items.map((item, index) => {
        return (
          <ListItem key={item.title} button>
            <ListItemAvatar>
              <Avatar alt={item.title} src={item.icon} />
            </ListItemAvatar>

            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
            />

            <ListItemSecondaryAction>
              <IconButton onClick={event => handleMenuToggle(index, event.target)}>
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
                    <MenuItem key={actionItem.title} onClick={() => handleAction(index, item, actionItem.action)}>
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
  )
}

export default ResourceList 
