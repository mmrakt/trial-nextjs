import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { Toolbar, Button, AppBar } from '@material-ui/core'
import Drawer from './drawer'
import MenuList from './menuList'

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
                    <Button color="inherit" className={classes.titleButton}>
                        日報つーる
                    </Button>
                    <MenuList />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
