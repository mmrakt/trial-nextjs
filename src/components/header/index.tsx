import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { Toolbar, Button, AppBar } from '@material-ui/core'
import Drawer from './drawer'
import MenuList from './menuList'
import Link from 'next/link'
import styled from 'styled-components'

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
const AppTitle = styled.a`
    text-decoration: none;
    cursor: pointer;
`

const Header = (): React.ReactElement => {
    const classes = useStyles()
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
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
                    <Link href="/">
                        <AppTitle>日報ツール</AppTitle>
                    </Link>
                    <MenuList />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
