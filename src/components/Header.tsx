import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import * as Colors from '@material-ui/core/colors'
import MenuIcon from '@material-ui/icons/Menu'
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Button,
  AppBar,
} from '@material-ui/core'
import styled from 'styled-components'
import Drawer from './Drawer/index'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleButton: {
    textTransform: 'none',
  },
  avatarButton: {
    float: 'right',
  },
}))

const AvatarButton = styled(Button)`
  float: right;
`
const HeaderComponent = (): any => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDrawer = () => {
    if (!isOpenDrawer) {
      setIsOpenDrawer(true)
    } else {
      setIsOpenDrawer(false)
    }
  }

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={handleDrawer} />
          </IconButton>
          <Drawer isOpenDrawer={isOpenDrawer} handleClose={handleDrawer} />
          <Button color="inherit" className={classes.titleButton}>
            日報つーる
          </Button>
          {/* <AvatarButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.avatarButton}
          >
            <Avatar></Avatar>
          </AvatarButton> */}

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/signin">
                <a>signin</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/signup">
                <a>signup</a>
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HeaderComponent
