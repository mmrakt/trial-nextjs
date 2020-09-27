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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    color: Colors.common.white,
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
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" className={classes.titleButton}>
          Next.js App
        </Button>
        <AvatarButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.avatarButton}
        >
          <Avatar></Avatar>
        </AvatarButton>

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
  )
}

export default HeaderComponent
