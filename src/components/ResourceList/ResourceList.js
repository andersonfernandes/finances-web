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
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ResourceList = ({
  items,
  editAction,
  deleteAction,
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

  const handleAction = (index, itemId, action) => {
    handleMenuToggle(index, null)
    if (action) action(itemId) 
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
                <MenuItem onClick={() => handleAction(index, item.id, editAction)}>Edit</MenuItem>
                <MenuItem onClick={() => handleAction(index, item.id, deleteAction)}>Delete</MenuItem>
              </Menu>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default ResourceList 
