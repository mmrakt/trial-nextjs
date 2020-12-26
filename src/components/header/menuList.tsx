import React from 'react'
import {} from '@material-ui/core'
import { Menu, MenuItem, Avatar, Button } from '@material-ui/core'
import Link from 'next/link'
import { AuthContext } from '../../auth/AuthProvider'
import { fbAuth } from 'functions/firebase'
import { useRouter } from 'next/router'

const MenuList = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    const [isOpenMenu, setIsOpenMenu] = React.useState(null)
    const handleClick = (e) => {
        setIsOpenMenu(e.currentTarget)
    }
    const handleClose = () => {
        setIsOpenMenu(null)
    }
    const handleSignout = React.useCallback(async () => {
        await fbAuth.signOut()
        useRouter().push('/')
    }, [])

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar></Avatar>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={isOpenMenu}
                keepMounted
                open={Boolean(isOpenMenu)}
                onClose={handleClose}
            >
                {signinAccount ? (
                    // NOTE: Material-uiのコンポーネント内でfragmentを使うとエラーになる
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Link href={`/${signinAccount.userId}`}>
                                <a>マイページ</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <a onClick={handleSignout}>ログアウト</a>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signin">
                                <a>ログイン</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signup">
                                <a>ユーザー登録</a>
                            </Link>
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </>
    )
}
export default MenuList
