import React, { useContext } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import {
    Avatar,
    Menu,
    MenuItem,
    Toolbar,
    Button,
    AppBar,
} from '@material-ui/core'
import styled from 'styled-components'
import Drawer from './drawer'
import { AuthContext } from '../pages/_app'

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

const Header = (): React.ReactElement => {
    const classes = useStyles()
    const { currentUser } = useContext(AuthContext)
    const [isOpenMenu, setIsOpenMenu] = React.useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
    const handleClick = (e) => {
        setIsOpenMenu(e.currentTarget)
    }
    const handleClose = () => {
        setIsOpenMenu(null)
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
                    <MenuIcon onClick={handleDrawer} />
                    <Drawer
                        isOpenDrawer={isOpenDrawer}
                        handleClose={handleDrawer}
                    />
                    <Button color="inherit" className={classes.titleButton}>
                        日報つーる
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
                        anchorEl={isOpenMenu}
                        keepMounted
                        open={Boolean(isOpenMenu)}
                        onClose={handleClose}
                    >
                        {currentUser ? (
                            <>
                                <MenuItem onClick={handleClose}>
                                    <Link href={`/${currentUser.userId}`}>
                                        <a>マイページ</a>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link href="/signup">
                                        <a>サインアウト</a>
                                    </Link>
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={handleClose}>
                                    <Link href="/signin">
                                        <a>サインイン</a>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link href="/signup">
                                        <a>サインアップ</a>
                                    </Link>
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
